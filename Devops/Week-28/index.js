// const express = require("express");
// const os = require("os");
const cluster = require("cluster");

// const TOTAL_CPUs = os.cpus().length;
const TOTAL_CPUs = 10;

// const PORT = 3000;

// if(cluster.isPrimary){
//     console.log(`Number of CPUs: ${TOTAL_CPUs}`);
//     console.log(`Primary ${process.pid} is running.`)
    
//     for(let i = 0;i<TOTAL_CPUs;i++){
//         cluster.fork();
//     };
    
//     cluster.on("exit",(worker,code,signal) => {
//         console.log(`worker ${process.pid} died.`);
//         console.log("Let's fork another process.");
//         cluster.fork();
//     })
// } else{
//     const app = express();
//     console.log(`Worker ${process.pid} started.`)
//     app.get("/",(req,res,next)  =>{
//         res.send("Server is up!!")
//     });

//     app.get("/api/:n",(req,res)=>{
//         let n = req.params.n;
//         let count = 0;
//         if(n>50000000){
//             n = 50000000;
//         };
//         for(let i = 0;i<=n;i++){
//             count += i;
//         };

//         res.send(`Final Count is ${count} ${process.pid}.`);
//     });
    
//     app.listen(PORT,()=>{
//         console.log(`Listening on ${PORT}.`)
//     })
// }


const lnum = 1000000000000000;

if(cluster.isPrimary){
    console.log(`Primary process is ${process.pid}`);
    let stack = lnum / TOTAL_CPUs;
    for(let i = 0;i<TOTAL_CPUs;i++){
        const lower_limit = 0;
        const upper_limit = stack;
        cluster.fork();
        lower_limit += stack;
        upper_limit += stack;
    }

} else {

}