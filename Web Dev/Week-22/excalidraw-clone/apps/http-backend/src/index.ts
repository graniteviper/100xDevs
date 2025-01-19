import express from "express";

const app = express();

app.get('/',(req,res)=>{
    res.send("HTTP server is up and running.")
})

app.listen(8000);