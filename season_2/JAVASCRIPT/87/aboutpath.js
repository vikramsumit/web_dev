import path from "path"

let myPath = "raju@kali:~\\code only\\web_dev\\season_2\\JAVASCRIPT\\87\\read.txt"
console.log(path.extname(myPath))

console.log(path.dirname(myPath))
console.log(path.basename(myPath))

console.log(path.join("raju@kali:~/", "programs\\read.txt"))