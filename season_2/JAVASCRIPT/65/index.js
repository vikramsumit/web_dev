const factorial = (a) => {
    if (a === 0 || a === 1) {
        return 1;
    } 
        return a * factorial(a - 1)
    
}

// console.log(factorial(2))

const fibonacci = (n) => {
    if (n <= 1) {
        return n;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(`Factorial of 5: ${factorial(0)}`); 
console.log(`Fibonacci of 5: ${fibonacci(5)}`); 