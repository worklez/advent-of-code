const fs = require('fs');
const inputLines = fs.readFileSync(process.argv[2], 'utf-8').split('\n').filter(s => !!s);

const NUM_OP = 3;

function test(numbers, combination) {
  let index = 1;
  let result = numbers[0];
  while (index < numbers.length) {
    const val = combination % NUM_OP;
    if (val === 0) {
      result += numbers[index];
    } else if (val === 1){
      result *= numbers[index];
    } else if (val === 2) {
      result = parseInt(('' + result) + numbers[index], 10);
    }
    combination = Math.floor(combination / NUM_OP);
    index++;
  }
  return result;
}

function testCombinations(needle, numbers) {
  const possibleCombinations = Math.pow(NUM_OP, numbers.length - 1);
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
