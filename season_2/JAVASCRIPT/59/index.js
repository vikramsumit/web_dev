// filename: faultyCalc.js
const readline = require('readline');

// mapping of wrong operations\
const faultyMap = {
  '+': (a, b) => a - b,
  '*': (a, b) => a + b,
  '-': (a, b) => a / b,
  '/': (a, b) => a ** b
};

// mapping of correct ops\
const correctMap = {
  '+': (a, b) => a + b,
  '*': (a, b) => a * b,
  '-': (a, b) => a - b,
  '/': (a, b) => a / b
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function ask(query) {
  return new Promise(resolve => rl.question(query, ans => resolve(ans)));
}

(async () => {
  const a = parseFloat(await ask('Enter first number: '));
  const op = await ask('Enter operator (+, -, *, /): ');
  const b = parseFloat(await ask('Enter second number: '));

  // decide if faulty (10% chance)
  const useFaulty = Math.random() < 0.1;
  let result;

  if (useFaulty && faultyMap[op]) {
    console.log('Performing faulty operation!');
    result = faultyMap[op](a, b);
  } else if (correctMap[op]) {
    result = correctMap[op](a, b);
  } else {
    console.error('Invalid operator.');
    rl.close();
    process.exit(1);
  }

  console.log(`Result: ${result}`);
  rl.close();
})();