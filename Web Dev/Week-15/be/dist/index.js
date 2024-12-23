"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const dotenv = __importStar(require("dotenv"));
const bcrypt = __importStar(require("bcrypt"));
const db_1 = require("./db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("./middleware");
dotenv.config({ path: ".env" });
const app = (0, express_1.default)();
const connectToDB = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default
        .connect(process.env.DB_CONNECTION_STRING)
        .then(() => {
        console.log("Connected to the database.");
    })
        .catch((err) => {
        console.log("An error occurred while connecting to the database. The error message is: ", err);
    });
});
connectToDB();
app.use(express_1.default.json());
app.post("/app/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let username = req.body.username;
    let password = req.body.password;
    if (!username || !password) {
        res.status(411).json({ message: "Please provide username and password." });
    }
    password = password.trim();
    username = username.trim();
    const userExists = yield db_1.userModel.findOne({ username: username });
    if (userExists) {
        res.status(403).json({
            message: "User with this username already exists.",
        });
    }
    else {
        bcrypt.hash(password, 10, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                return res.status(500).json({
                    message: "An error occurred while hashing the password.",
                });
            }
            else {
                const user = yield db_1.userModel.create({
                    username: username,
                    password: hash,
                });
                if (user) {
                    return res.status(200).json({
                        message: "User created successfully.",
                        username: user.username,
                    });
                }
                else {
                    return res.status(500).json({
                        message: "An error occurred while creating the user.",
                        user: user,
                    });
                }
            }
        }));
    }
}));
app.post("/app/v1/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let username = req.body.username;
    let password = req.body.password;
    if (!username || !password) {
        res.status(411).json({ message: "Please provide username and password." });
    }
    password = password.trim();
    username = username.trim();
    const user = yield db_1.userModel.findOne({ username: username });
    if (!user) {
        res.status(404).json({ message: "User not found." });
    }
    else {
        try {
            bcrypt.compare(password, user.password, (err, isMatch) => __awaiter(void 0, void 0, void 0, function* () {
                if (err) {
                    return res.status(403).json({
                        message: "The password is not correct.",
                    });
                }
                else {
                    if (isMatch) {
                        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
                        return res.status(200).json({
                            token: token,
                            username: user.username,
                        });
                    }
                }
            }));
        }
        catch (error) {
            console.log(error);
            res.status(500).json({ message: "An error occurred." });
        }
    }
}));
// @ts-ignore
app.post("/app/v1/createContent", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const link = req.body.link;
    const type = req.body.type;
    const title = req.body.title;
    //@ts-ignore
    const userId = req.userId;
    try {
        yield db_1.contentModel.create({
            link: link,
            type: type,
            title: title,
            userId: userId,
            tags: []
        });
        return res.status(200).json({
            message: "Content Created."
        });
    }
    catch (error) {
        console.log(error);
        return res.status(400).json({
            message: "Unexpected Error Occurred."
        });
    }
}));
//@ts-ignore
app.get("/app/v1/getContent", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const id = req.userId;
    try {
        const contents = yield db_1.contentModel.find({ userId: id }).populate("userId", 'username');
        if (contents) {
            return res.status(200).json({
                message: "Data Sent!!",
                contents: contents
            });
        }
        else {
            res.status(500).json({
                message: "Error in fetching data."
            });
        }
    }
    catch (err) {
        console.log("Error in getContent: " + err);
        res.status(400).json({
            message: "OOPS!! Server Crashed Unexpectedly."
        });
    }
}));
//@ts-ignore
app.delete("/app/v1/deleteContent", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //@ts-ignore
    const id = req.userId;
    const contentId = req.body.contentId;
    yield db_1.contentModel.deleteOne({ _id: contentId, userId: id }).then(() => {
        res.status(200).json({
            message: "Data deleted Successfully.",
        });
    }).catch((err) => {
        console.log("error");
        res.status(500).json("Error While Deleting.");
    });
}));
//@ts-ignore
app.post("/app/v1/shareContent", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    //@ts-ignore
    const userId = req.userId;
    const user = yield db_1.userModel.findById(userId);
    if (!user) {
        return res.status(404).json({
            message: "User does not exist.",
        });
    }
    const content = yield db_1.contentModel.findById(contentId);
    if (!content) {
        return res.status(404).json({
            message: "Error while sharing."
        });
    }
    return res.status(200).json({
        message: "The content can be shared.",
        contentId
    });
}));
app.get("/app/v1/shareContent/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.body.contentId;
    if (!contentId) {
        res.json(404).json({
            message: "Content ID not recieved."
        });
    }
    try {
        const content = yield db_1.contentModel.findById(contentId);
        if (content) {
            res.status(200).json({
                message: "Content sent.",
                content
            });
        }
        else {
            res.status(400).json({
                message: "Link is invalid."
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Unexpected Error Occurred."
        });
    }
}));
app.listen(3000, () => {
    console.log("The server is listening at the port 3000.");
});
