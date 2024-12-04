const fs = require('fs');
const inputLines = fs.readFileSync(process.argv[2], 'utf-8').split('\n').filter(s => !!s);

const leftList = [];
const rightList = [];

inputLines.forEach(line => {
  const [left, right] = line.split(/\s+/).map(s => parseInt(s, 10));
  leftList.push(left);
  rightList.push(right);
});

leftList.sort();
rightList.sort();

let sum = 0;

for (let i = 0; i < leftList.length; i++) {
  sum += Math.abs(leftList[i] - rightList[i]);
}

console.log(sum);
