import express, { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// import authMiddleware from "./middlewares/middleware";
import {JWT_SECRET,userSignupSchema,userSigninSchema} from "@repo/backend-common/config"
import { prisma } from "@repo/database/db";

const app = express();

app.use(express.json());

interface member {
    id: String,
}

interface roomInterface {
    creator: String,
    members: member[]
}

const room: roomInterface[] = [];

app.post("/signup", async (req: Request, res: Response): Promise<any> => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
    name: req.body.name,
  };
  const { success } = userSignupSchema.safeParse(userData);
  if (!success) {
    return res.status(400).json({
      message: "Error in input data.",
    });
  } else {
        try {
        const user = await prisma.user.create({
          data:{
            email: userData.email,
            password: userData.password,
            name: userData.name
          }
        })
        console.log(user);
        res.send("Done");
        //const token = jwt.sign({user._id},JWT_SECRET) // Creating token
        //Send res with the token.
      } catch (error) {
          console.log(error);
          res.status(400).json({
              message: "Error while creating the User Account."
          })
      }
  }
            
  }
);
/*
app.post("/signin", async (req: Request, res: Response): Promise<any> => {
  const userData = {
    email: req.body.email,
    password: req.body.password,
  };
  const { success } = userSigninSchema.safeParse(userData);
  if (!success) {
    return res.status(400).json({
      message: "Error in input data.",
    });
  } else {
    /*
        try {
            // Verify the user.
        //const token = jwt.sign({user._id,JWT_SECRET}) // Creating token

        //Send res with the token.
    }
        } catch (error) {
            console.log(error);
            res.status(400).json({
                message: "Error while creating the User Account."
            })
        }
  }
});

app.post("/createRoom", authMiddleware,(req: Request,res: Response): Promise<any> =>{
    const id = req.userId;
    if(!id){
        return res.status(400).json({
            message: "User not found."
        })
    } else{
        // Create a new room and add the creator as admin in the DB. The workspace will persist in the db.
        // Generate a link with which others can join the workspace, they will be added in the member list in the db.
        return res.json({
            message: "Sent"
        })
    }


})
*/

app.listen(8000);

/*
 [
{creator,[
members
]}
]
*/