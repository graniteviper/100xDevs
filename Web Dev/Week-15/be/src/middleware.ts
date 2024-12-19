import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });

export const userMiddleware = (req: Request,res: Response,next: NextFunction) =>{
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({message:"No token provided"});
    }
    const decoded = jwt.verify(token as string,process.env.JWT_SECRET!)
    if(decoded){
        //@ts-ignore
        req.userId = decoded.id;
        // console.log(decoded)
        next();
    } else{
        res.status(400).json({
            message:"Token invalid."
        })
    }
}