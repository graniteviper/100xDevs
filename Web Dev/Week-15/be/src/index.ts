import mongoose from "mongoose";
import express from "express";
import * as dotenv from "dotenv";
import * as bcrypt from "bcrypt";
import { contentModel, userModel } from "./db";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { userMiddleware } from "./middleware";
dotenv.config({ path: ".env" });
const app = express();

const connectToDB = async () => {
  await mongoose
    .connect(process.env.DB_CONNECTION_STRING!)
    .then(() => {
      console.log("Connected to the database.");
    })
    .catch((err) => {
      console.log(
        "An error occurred while connecting to the database. The error message is: ",
        err
      );
    });
};

connectToDB();

app.use(express.json());

app.post("/app/v1/signup", async (req, res) => {
  let username: string = req.body.username;
  let password: string = req.body.password;

  if (!username || !password) {
    res.status(411).json({ message: "Please provide username and password." });
  }

  password = password.trim();
  username = username.trim();

  const userExists = await userModel.findOne({ username: username });

  if (userExists) {
    res.status(403).json({
      message: "User with this username already exists.",
    });
  } else {
    bcrypt.hash(password, 10, async (err, hash) => {
      if (err) {
        return res.status(500).json({
          message: "An error occurred while hashing the password.",
        });
      } else {
        const user = await userModel.create({
          username: username,
          password: hash,
        });
        if (user) {
          return res.status(200).json({
            message: "User created successfully.",
            username: user.username,
          });
        } else {
          return res.status(500).json({
            message: "An error occurred while creating the user.",
            user: user,
          });
        }
      }
    });
  }
});

app.post("/app/v1/login", async (req, res) => {
  let username: string = req.body.username;
  let password: string = req.body.password;
  if (!username || !password) {
    res.status(411).json({ message: "Please provide username and password." });
  }
  password = password.trim();
  username = username.trim();
  const user = await userModel.findOne({ username: username });
  if (!user) {
    res.status(404).json({ message: "User not found." });
  } else {
    try {
      bcrypt.compare(password, user.password, async (err, isMatch) => {
        if (err) {
          return res.status(403).json({
            message: "The password is not correct.",
          });
        } else {
          if (isMatch) {
            const token = jwt.sign(
              { id: user._id },
              process.env.JWT_SECRET!,
              { expiresIn: "24h" }
            );
            return res.status(200).json({
              token: token,
              username: user.username,
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "An error occurred." });
    }
  }
});

// @ts-ignore
app.post("/app/v1/createContent",userMiddleware,async (req, res) => {
  const link  = req.body.link;
  const type = req.body.type;
  const title = req.body.title;
  //@ts-ignore
  const userId = req.userId;
  
  try{
    await contentModel.create({
      link: link,
      type:type,
      title: title,
      userId: userId,
      tags:[]
    });

    return res.status(200).json({
      message:"Content Created."
    })
  }catch(error){
    console.log(error);
    return res.status(400).json({
      message:"Unexpected Error Occurred."
    })
  }
});

//@ts-ignore
app.get("/app/v1/getContent",userMiddleware,async (req,res)=>{
  //@ts-ignore
  const id = req.userId;
  try{
    const contents = await contentModel.find({userId:id}).populate("userId",'username')
    if(contents){
      return res.status(200).json({
        message: "Data Sent!!",
        contents: contents
      })
    } else{
      res.status(500).json({
        message:"Error in fetching data."
      })
    }
  } catch(err){
    console.log("Error in getContent: " + err);
    res.status(400).json({
      message:"OOPS!! Server Crashed Unexpectedly."
    })
  } 
})

//@ts-ignore
app.delete("/app/v1/deleteContent",userMiddleware, async (req, res) => {
  //@ts-ignore
  const id = req.userId;
  const contentId = req.body.contentId;
  await contentModel.deleteOne({_id:contentId,userId:id}).then(()=>{
    res.status(200).json({
      message: "Data deleted Successfully.",
    })
  }).catch((err)=>{
    console.log("error");
    res.status(500).json("Error While Deleting.")
  })
});


//@ts-ignore
app.post("/app/v1/shareContent",userMiddleware,async (req, res) => {
  const contentId: string = req.body.contentId;
  //@ts-ignore
  const userId: string = req.userId;
  const user = await userModel.findById(userId);
  if(!user){
    return res.status(404).json({
      message:"User does not exist.",
    })
  }
  const content = await contentModel.findById(contentId);
  if(!content){
    return res.status(404).json({
      message:"Error while sharing."
    })
  }
  return res.status(200).json({
    message:"The content can be shared.",
    contentId
  })
});

app.get("/app/v1/shareContent/:shareLink",async (req, res) => {
  const contentId = req.body.contentId;
  if(!contentId){
    res.json(404).json({
      message: "Content ID not recieved."
    })
  }
  try {
    const content = await contentModel.findById(contentId);
  if(content){
    res.status(200).json({
      message:"Content sent.",
      content
    })
  } else{
    res.status(400).json({
      message: "Link is invalid."
    })
  }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:"Unexpected Error Occurred."
    })
  }
});

app.listen(3000, () => {
  console.log("The server is listening at the port 3000.");
});
