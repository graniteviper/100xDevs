import mongoose from "mongoose";

const contentTypes = {
    Audio: 'audio',
    Blog: 'blog',
    Video: 'video',
    Image: 'image',
    link: 'link'
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
},{timestamps:true});

const contentSchema = new mongoose.Schema({
    link: String,
    type: {
        type: String,
        enum: Object.values(contentTypes)
    },
    title: String,
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    tags:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag"
    }]
},{timestamps:true});

const tagSchema = new mongoose.Schema({
    title: String,
},{
    timestamps:true
});

const linkSchema = new mongoose.Schema({
    hash: String,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true});

export const userModel = mongoose.model("User",userSchema);
export const contentModel = mongoose.model("Content",contentSchema);
export const tagModel = mongoose.model("Tags",tagSchema);
export const linkModel = mongoose.model("Links",linkSchema);

