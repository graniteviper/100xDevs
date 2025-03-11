// import jwt from "jsonwebtoken";
// import {Request,Response,NextFunction} from "express";

// const authMiddleware = async (req:Request,res:Response,next: NextFunction): Promise<any>=>{
//     const token = req.body.token;  // header authorization
//     const decoded = jwt.decode(token);
//     if(!decoded){
//         return res.status(500).json({
//             message: "Token is not valid."
//         })
//     } else{
//         req.userId = decoded._id; // fix this by changing the structure of req object.
//         res.json({
//             message: "Token authenticated.",
//             // id: decoded._id, 
//         })
//         next();
//     }
// }

// export default authMiddleware;