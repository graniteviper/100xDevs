import mongoose from "mongoose";

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
    type: String,
    title: String,
    userId:{
        userId: mongoose.Schema.Types.ObjectId,
        ref: userSchema
    }
},{timestamps:true})

const tagSchema = new mongoose.Schema({
    title: String,
},{
    timestamps:true
})

export const userModel = mongoose.model("User",userSchema);

