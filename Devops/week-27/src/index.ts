import { PrismaClient } from "@prisma/client";
import express from "express";
const app = express();
const prismaClient = new PrismaClient();

app.use(express.json());

app.get("/",async (req,res)=>{
    const users = await prismaClient.user.findMany();
    res.json({
        users
    });
    return;
})

app.post("/",async(req,res) => {
    console.log(req.body);
    await prismaClient.user.create({
        data:{
            username: req.body.username
        }
    })
    res.json({
        message: "Data Added Successfully!"
    })
    return;
})

app.listen(8000,()=>{
    console.log("Connected to the Database.")
})
