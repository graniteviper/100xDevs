// Assignment:
/*
const express = require('express');
const app = express();

app.get('/sum',function(req,res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        result: a+b,
    })
})

app.get('/subtract',function(req,res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        result: a-b,
    })
})

app.get('/multiply',function(req,res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        result: a*b,
    })
})

app.get('/divide',function(req,res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        result: a/b,
    })
})

app.listen(3000);
*/



// ----------------------------------------------------------------------------------------------------------------------------- //
// Assignment-1:
/*
const express = require("express");
const app = express();

app.use(function(req,res,next){
    console.log("method:" + req.method);
    console.log("path: " + req.path);
    const timestamp = Date.now();
    console.log("timestamp: " + Math.floor(timestamp / 1000));
    next();
})

app.get("/get", function (req, res) {
  res.send("get endpoint");
});

app.post("/post", function (req, res) {
  res.send("post endpoint");
});

app.put("/put", function (req, res) {
  res.send("put endpoint");
});

app.delete("/del", function (req, res) {
  res.send("delete endpoint");
});

app.listen(3000);
*/



// Assignment-2:

const express = require("express");
const app = express();
let count = 0;

function increaseCount(req,res,next){
    if(req.path === '/'){
        count = count + 1 ;
    }
    next();
}

app.get('/',increaseCount,function(req,res){
    res.send("Connected!!")
})

app.get('/admin',function(req,res){
    console.log(count);
    res.send("Admin logged in Successfully!!")
    
})

app.listen(8000);