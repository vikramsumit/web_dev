let random = Math.random()
// console.log(random)
// let a = prompt("Enter first number")
// let c = prompt("Enter operation")
// let b = prompt("Enter second number")

// Use readline.question for input
let a = readline.question("Enter first number: "); 
let c = readline.question("Enter operation (+,-,*,/): ");
let b = readline.question("Enter second number: ");

let obj = {
    "+": "-",
    "*": "+",
    "-": "/",
    "/": "**",
}

if (random > 0.1) {
    console.log(`The result is ${a} ${c} ${b}`)
    alert(`The result is ${eval(`${a} ${c} ${b}`)}`)
    
}

else {
    c = obj[c]
    alert(`The result is ${eval(`${a} ${c} ${b}`)}`) 

}