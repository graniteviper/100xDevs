const express = require('express');
const app = express();


var users = [
    {
        name:"Tanishq",
        metadata:{
            profilePicture:"",
            gender:"Male",
            age:"19",
            address:{
                country:"India",
                state:"UP",
                city:"Ghaziabad"
            }
        },
        kidneys:[
            {
                healthy:false,
            }
        ]
    }
];

function readData(){
    let ans = users[0].name + " has " + users[0].kidneys.length + " kidneys.\n";
    if(users[0].kidneys.length ==1){
        ans = ans+"The first kidney is " + users[0].kidneys[0].healthy + "\n";
    }
    else if(users[0].kidneys.length ==0){
        ans = ans+"No kidneys found."
    }
    else{
        ans = ans+"The first kidney is " + users[0].kidneys[0].healthy + "\n";
        ans = ans+"The second kidney is " + users[0].kidneys[1].healthy + "\n";
    }
    return ans;
}

function addKidney(){
    users[0].kidneys.push({healthy:true});
}

function replaceKidneys(){
    for(let i = 0;i<users[0].kidneys.length;i++){
        if(users[0].kidneys[i].healthy == false){
            users[0].kidneys[i].healthy = true;
        }
    }
}

function removekidney(){
    for(let i = 0;i<users[0].kidneys.length;i++){
        if(users[0].kidneys.healthy == false){
            users[0].kidneys.splice(i,1);
        }
    }
}

app.get('/',function(req,res){
    let ans = readData();
    res.send(ans);
})

app.post('/addkidney',function(req,res){
    addKidney();
    res.send("Kidney added successfully!!")
})

app.put('/replacekidney',function(req,res){
    replaceKidneys();
    res.send("Kidneys replaced successfully!!")
})

app.delete('/removekidney',function(req,res){
    removekidney();
    res.send('Kidney removes successfully!!')
})

app.listen(3000);
