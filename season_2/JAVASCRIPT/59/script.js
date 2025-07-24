const faultyMap = {
  '+': (a, b) => a - b,
  '*': (a, b) => a + b,
  '-': (a, b) => a / b,
  '/': (a, b) => Math.pow(a, b)
};
const correctMap = {
  '+': (a, b) => a + b,
  '*': (a, b) => a * b,
  '-': (a, b) => a - b,
  '/': (a, b) => a / b
};

document.getElementById('calcBtn').addEventListener('click', () => {
  const a = parseFloat(document.getElementById('num1').value);
  const b = parseFloat(document.getElementById('num2').value);
  const op = document.getElementById('operator').value;
  
  if (isNaN(a) || isNaN(b)) {
    alert('Please enter valid numbers');
    return;
  }

  const useFaulty = Math.random() < 0.1;
  let result;

  if (useFaulty && faultyMap[op]) {
    result = faultyMap[op](a, b);
    document.getElementById('result').textContent = '⚠️ Faulty result: ' + result;
  } else if (correctMap[op]) {
    result = correctMap[op](a, b);
    document.getElementById('result').textContent = '✅ Correct result: ' + result;
  } else {
    document.getElementById('result').textContent = 'Invalid operator';
  }
});