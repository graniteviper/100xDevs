import mongoose from "mongoose";
import express from "express";
import * as dotenv from "dotenv";
import * as bcrypt from "bcrypt";
import { userModel } from "./db";
import jwt from "jsonwebtoken";
import { z } from "zod";
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
          return res.status(500).json({
            message: "The password is wrong.",
          });
        } else {
          if (isMatch) {
            const token = jwt.sign(
              { username: user.username },
              process.env.JWT_SECRET!,
              { expiresIn: "24h" }
            );
            return res.send({
              token: token,
              user: user.username,
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

app.post("/app/v1/createContent", (req, res) => {});

app.delete("/app/v1/deleteContent", (req, res) => {});

app.post("/app/v1/shareContent", (req, res) => {});

app.get("/app/v1/shareContentContent", (req, res) => {});

app.listen(3000, () => {
  console.log("The server is listening at the port 3000.");
});
