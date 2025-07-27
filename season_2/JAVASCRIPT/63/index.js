let arr = [2,1,3,4,5,6,7,8,9,10];

console.log(arr)
console.log(arr.length)
console.log(arr[4])

let a1 = [1, 2, 3,55,23, 45, 67, 89];
let a2 = [4, 5, 6,83,23,68, 90, 100];
let a4 = [7, 8, 9];
let a3 = a1.concat(a2, a4);
console.log(a3)

a3.sort((a,b) => a - b);
console.log(a3)

// let numbers = [1, 2, 3, 4, 5] 
// numbers.splice(1, 2)    
// numbers.splice(1, 3)  
// numbers.splice(1, 3, 222, 333) 
// (4) [1, 222, 333, 5]