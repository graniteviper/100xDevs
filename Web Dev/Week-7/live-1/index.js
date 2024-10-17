const express = require("express");
const {UserModel,TodoModel}  = require("./db.js")
const jwt = require('jsonwebtoken')
const JWT_SECRET = "s3cret";
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/todos-100xdevs")

const app = express();
app.use(express.json());

function auth(req,res,next){
    const token = req.headers.authorization
    const decodedData = jwt.verify(token,JWT_SECRET)
    if(decodedData){
        req.userId = decodedData.id
        next();
    }
    else{
        res.status(403).json({
            message:"User is not verified"
        })
    }
}

app.post("/signup", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    await UserModel.create({
        email: email,
        password: password,
        name: name
    });
    
    res.json({
        message: "You are signed up"
    })
});




app.post("/signin", async function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    const response = await UserModel.findOne({
        email: email,
        password: password,
    });

    if (response) {
        const token = jwt.sign({
            id: response._id.toString()
        },JWT_SECRET)

        res.json({
            token
        })
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
});


app.post("/addtodo",auth, function(req, res) {
    const userId = req.userId
    if(userId){
        res.json({
            userId:userId
        })
    }
    else{
        res.json({
            message:"No user id found."
        })
    }
    
});


app.get("/gettodos",auth, function(req, res) {
    const userId = req.userId
    res.json({
        userId
    })
});

app.listen(3000);
