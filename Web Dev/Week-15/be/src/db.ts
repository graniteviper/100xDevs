import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
},{timestamps:true});

const contentSchema = new mongoose.Schema({
    link: String,
    type: String,
    title: String,

},{timestamps:true})

const user = mongoose.model("User",userSchema);

