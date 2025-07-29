let a = 6;

function factorial(number) {
    let arr = Array.from(Array(number + 1).keys())
    // console.log(arr.slice(1,))
    let c = arr.slice(1,).reduce((a, b) => {
        return a * b
    })
    // console.log(c);
    return c;
}


function facfor(number){
    let fac = 1;
    for (let index = 1; index <= number; index++) {
        fac = fac * index;
        // console.log(fac);
        
    }
    return fac;
}

console.log(facfor(5))
console.log(factorial(a));