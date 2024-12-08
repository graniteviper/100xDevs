"use strict";
/*
Greet function
function greet(name: String) {
    console.log("Hello " + name)
}
greet('Tanishq')
*/
function greet(student) {
    console.log("Hello, my name is " + student.name);
    if (student.age > 18) {
        return true;
    }
    else {
        return false;
    }
}
greet({
    name: "Tanishq",
    age: 20,
    subject: "Math",
});
