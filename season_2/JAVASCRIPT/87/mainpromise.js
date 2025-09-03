import fs from "fs/promises";

let a = await fs.readFile("raju2.txt");
let b = await fs.appendFile("raju2.txt", '\n\n\n\nraju is a bussinessman and a good progmrammer');

console.log(a.toString()    , b);