// synchronous or blocking
// - line by line execution

// Asynchronous or Non-blocking
// - line by line execution not guarrented
// - callbacks will fire

const fs = require("fs");
fs.readFile("dele.txt", "utf-8", (err, data)=>{
    console.log(data);
});
console.log("This is mars not the earth");