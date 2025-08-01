let a = prompt("Enter a number");
let b = prompt("Enter another number");
let c = prompt("Enter a third number");


if (isNaN(a) || isNaN(b) || isNaN(c)) {
    console.error("One or more inputs are not valid numbers.");
    // alert("Please enter valid numbers.");
    throw new Error("Invalid input: Please enter valid numbers.");
}
let sum = parseInt(a) + parseInt(b) + parseInt(c);
// alert("The sum of the three numbers is: " + sum);

console.log("The sum of the three numbers is: " + sum);

function main(){ 
    let x = 1;
    try {
        console.log("The sum is ", sum * x)
        return true
        
    } catch (error) {
        console.log("Error aa gaya bhai")
        return false
    } 
    finally{
        console.log("files are being closed and db connection is being closed")
    }
  
}

let d = main()