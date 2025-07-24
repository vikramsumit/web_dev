console.log("I am a tutorial on Loops")

let a = 5;
// console.log(a)
// console.log(a+1)
// console.log(a+2)

for (let i = 0; i < 100; i++) { 
    console.log(a + i); 
}

let obj = {
    name: "raju",
    role: "Programmer",
    company: "Rajubhai AI"
}
 
for (const key of Object.keys(obj)) {

    console.log(key, obj[key])
}
// for (const key in obj) {  
//         console.log(key)
// }

// for (const c of "Harry") {
//     console.log(c)
// }

let i = 5;
// while (i<6000) {
//     console.log(i)
//     i++;
// }

// let i = 10;
do {
    console.log(i)
    i++;
} while (i<600);