alert("Hello world")

console.log("Hello world");
console.log("This is a log message");
console.info("This is an info message");

var a = prompt("Enter a value for 'a':");
console.log("You entered: " + a);
var isTrue = confirm("Are you sure?, you want to leave this page?");
if (isTrue) {
    console.log("You confirmed the action.");
} else {
    console.log("You cancelled the action.");
}   
// console.log("You entered: " + isTrue);


document.title = "JavaScript Console Messages";
document.body.style.backgroundColor = "lightblue";
// console.error("This is an error message");
// console.warn("This is a warning message");