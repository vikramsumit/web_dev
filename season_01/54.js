nodemonconst fs = require("fs");
let text = fs.readFileSync("dele.txt", "utf-8");
text = text.replace("content", "Rohan");

console.log("The content of the file is")
console.log(text);

console.log("creating a new file...")
fs.writeFileSync("rohan.txt", text);