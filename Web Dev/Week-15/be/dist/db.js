"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.linkModel = exports.tagModel = exports.contentModel = exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const contentTypes = {
    Audio: 'audio',
    Blog: 'blog',
    Video: 'video',
    Image: 'image',
    link: 'link'
};
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
    type: {
        type: String,
        enum: Object.values(contentTypes)
    },
    title: String,
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    },
    tags: [{
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Tag"
        }]
}, { timestamps: true });
const tagSchema = new mongoose_1.default.Schema({
    title: String,
}, {
    timestamps: true
});
const linkSchema = new mongoose_1.default.Schema({
    hash: String,
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });
exports.userModel = mongoose_1.default.model("User", userSchema);
exports.contentModel = mongoose_1.default.model("Content", contentSchema);
exports.tagModel = mongoose_1.default.model("Tags", tagSchema);
exports.linkModel = mongoose_1.default.model("Links", linkSchema);
