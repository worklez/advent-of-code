const fs = require('fs');
const inputLines = fs.readFileSync(process.argv[2], 'utf-8').split('\n').filter(s => !!s);

function test(numbers, combination) {
  let bitIndex = numbers.length - 1;
  let result = numbers[0];
  for (let bitIndex = numbers.length - 2; bitIndex >= 0; bitIndex--) {
    const bitVal = (combination >> bitIndex) & 1;
    if (bitVal) {
      result += numbers[numbers.length - bitIndex - 1];
    } else {
      result *= numbers[numbers.length - bitIndex - 1];
    }
  }
  return result;
}

function testCombinations(needle, numbers) {
  const possibleCombinations = Math.pow(2, numbers.length - 1);
  for (let i = 0; i < possibleCombinations; i++) {
    if (test(numbers, i) == needle) return true;
  }
  return false;
}

const input = inputLines.map(line => {
  const [testString, rest] = line.split(': ');
  return [parseInt(testString, 10), rest.split(' ').map(s => parseInt(s, 10))];
});

let sum = 0;

input.forEach(equation => {
  if (testCombinations(...equation)) sum += equation[0];
});

console.log(sum);
