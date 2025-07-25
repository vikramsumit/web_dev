import { question } from 'readline-sync';

let random = Math.random()
// console.log(random)
// let a = prompt("Enter first number")
// let c = prompt("Enter operation")
// let b = prompt("Enter second number")

// Use readline.question for input
let a = question("Enter first number: "); 
let c = question("Enter operation (+,-,*,/): ");
let b = question("Enter second number: ");

let obj = {
    "+": "-",
    "*": "+",
    "-": "/",
    "/": "**",
}

if (random > 0.9) {
    console.log(`The result is ${a} ${c} ${b}`)
    // console.log(`The result is ${eval(`${a} ${c} ${b}`)}`)
    
}

else {
    c = obj[c]
    console.log(`The result is ${eval(`${a} ${c} ${b}`)}`) 

}

