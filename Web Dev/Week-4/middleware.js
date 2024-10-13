const express = require('express');
const app = express();

function ageChecker(age){
    if(age>14){
        return true;
    }
    else{
        return false;
    }
}

function ageCheckerMiddleware(req,res,next){
    const age = req.query.age;
    if(age>14){
        next();
    }
    else{
        res.json({
            "message":"Not old enough."
        })
    }
}

function buyTicketMiddleware(req,res,next){
    const money = req.query.money;
    if(money>=100){
        next();
    }
    else{
        res.json({
            "message":"Not enough money."
        })
    }
}

app.get('/rideOne',buyTicketMiddleware,ageCheckerMiddleware,function(req,res,next){
    res.json({
        "message":"Enjoy your ride!!"
    })
})

app.listen(3000);
