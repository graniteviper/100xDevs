/*
Greet function
function greet(name: String) {
    console.log("Hello " + name)
}
greet('Tanishq')
*/

/*
Sum function
function sum(a:number,b:number) {
    console.log(a+b)
    return a+b
}
const ans: number = sum(5,2)
*/

/*
isLegal function
function isLegal(age: number): Boolean {
    if(age<18){
        return false;
    }
    else{
        return true;
    }
}

let check:Boolean = isLegal()
if(check == true){
    console.log("You are eligible to vote")
}
else{
    console.log("You are not eligible to vote")
}
*/

/*
Delayed Call function
function delayedCall(fn: ()=>void){
    setTimeout(fn, 3000);
}
delayedCall(()=>{console.log("Hello there")})
*/

/*
objects in TS
interface Student{
    name: string,
    age: number,
    subject: string,
}

function greet(student:Student){
    console.log("Hello, my name is " + student.name)
    if(student.age>18){
        return true;
    }
    else{
        return false;
    }
}

greet({
    name: "Tanishq",
    age:20,
    subject: "Math",
})
*/


