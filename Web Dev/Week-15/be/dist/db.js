"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });
const contentSchema = new mongoose_1.default.Schema({
    link: String,
    type: String,
    title: String,
    userId: {
        userId: mongoose_1.default.Schema.Types.ObjectId,
        ref: userSchema
    }
}, { timestamps: true });
const tagSchema = new mongoose_1.default.Schema({
    title: String,
}, {
    timestamps: true
});
exports.userModel = mongoose_1.default.model("User", userSchema);
