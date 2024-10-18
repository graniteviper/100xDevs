const express = require("express")
const {UserModel,TodoModel}  = require("./db.js")
const jwt = require('jsonwebtoken')
const JWT_SECRET = "s3cret"
const mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/todos-100xdevs")
const bcrypt = require('bcrypt')
const {z} = require('zod')

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
    const requiredBody = z.object({
        email: z.string().min(5).max(100).email(),
        password: z.string().min(6).max(32),
        name: z.string().min(5).max(100),
    })  

    // const parsedData = requiredBody.parse(req.body);
    const parsedDataWithSuccess = requiredBody.safeParse(req.body);

    if(!parsedDataWithSuccess.success){
        res.json({
            message:"Incorrect format",
            error: parsedDataWithSuccess.error
        })
        return
    }


    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;


    try {
        const hashedPassword = await bcrypt.hash(password,5)
    
        await UserModel.create({
            email: email,
            password: hashedPassword,
            name: name
        });
    } catch (error) {
        res.json({
            message:"User already exists."
        })
    }
    
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

    if(!response){
        res.status(403).json({
            message:"User does not exist."
        })
    }

    const passwordMatch = bcrypt.compare(password,response.password)

    if (passwordMatch) {
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

