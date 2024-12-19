"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: ".env" });
const userMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    if (decoded) {
        //@ts-ignore
        req.userId = decoded.id;
        // console.log(decoded)
        next();
    }
    else {
        res.status(400).json({
            message: "Token invalid."
        });
    }
};
exports.userMiddleware = userMiddleware;
