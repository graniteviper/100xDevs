import mongoose from "mongoose";
import express from "express";
import * as dotenv from "dotenv";
import * as bcrypt from "bcrypt";
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

app.post("/app/v1/signup", (req, res) => {
    let username:string = req.body.username;
    let password:string = req.body.password;

    if(!username || !password){
        res.status(411).json({message: "Please provide username and password."});
    }

    password = password.trim();
    username = username.trim();
    bcrypt.hash(password, 10, (err, hash) => {
        if(err){
            return res.status(500).json({
                message: "An error occurred while hashing the password."
            })
        } else{
            res.send(hash);
        }
    })


});

app.post("/app/v1/login", (req, res) => {});

app.post("/app/v1/createContent", (req, res) => {});

app.delete("/app/v1/deleteContent", (req, res) => {});

app.post("/app/v1/shareContent", (req, res) => {});

app.get("/app/v1/shareContentContent", (req, res) => {});

app.listen(3000, () => {
  console.log("The server is listening at the port 3000.");
});
