// import chalk from "chalk";
// import path from 'path';
// console.log(chalk.blue(__dirname));
// console.log(chalk.red.bold('This is an error message.'));
// console.log(chalk.green.underline('This is a success message.'));

// Assignment-1

/*
const {Command} = require('commander');
const program = new Command();
const fs = require('fs');

program
.name('count')
.description("Count the number of words in a file")
.version('1.0.0');

program.command('count')
.description('Count the number of files in a file.')
.argument('<file>','file to count from')
.action((fileName)=>{
    fs.readFile(fileName,"utf-8",function(err,data){
        let total = 0;
        for (let index = 0; index < data.length; index++) {
            if(data[index] === " "){
                total++;
            }
        }
        console.log(total+1);
        
    });
});

program.parse();
*/




// Assignment-2

/*
const {Command} = require('commander');
const program = new Command();
const fs = require('fs');

program
.name('addtodo')
.description('add a todo to a list of todos.')
.version('1.0.0');

program.command('addtodo')
.description("add todo to a file.")
.argument('<todo>',"the todo to be added.")
.action(function(todo){
    fs.writeFile('a.txt',todo,(err)=>{
        if(err){
            console.log("Error: "+ err);
        }
        else{
            console.log("Todo added Successfully!!");
        }
    })
});


program
.name('deletetodo')
.description('Delete a todo')

program.command('deletetodo')
.description("Delete a todo")
.argument('<todo>',"the todo to be deleted")
.action(function(todo){
    fs.writeFile('a.txt',"",(err)=>{
        if(err){
            console.log("Error: "+ err);
        }
        else{
            console.log("Todo deleted Successfully!!");
        }
    })
});


program
.name('todos')
.description('Show todos')

program.command('todos')
.description("Show a todo")
.argument('<listtodos>',"to show todos")
.action(function(){
    fs.readFile('a.txt',"utf-8",(err,data)=>{
        if(err){
            console.log("Error: "+ err);
        }
        else{
            console.log(data);
        }
    })
});

program.parse();
*/




// Bugs:
// 1. Only one todo can be added in the File.
// 2. Only one word todos can be added in the File.
// 3. Delete functionality needs to be improved.
// 4. Need to improves listing todos such that it requires no arguments.
