import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const userMiddleware = (req: Request,res: Response,next: NextFunction) =>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({message:"No token provided"});
    }
    jwt.verify(token,process.env.JWT_SECRET!,(err,decoded)=>{
        if(err){
            return res.status(401).json({message:"Invalid token"});
        }
        else {
            if(decoded){
                //@ts-ignore
                req.userId = decoded.id;
                next()
            }
        }
    })
}