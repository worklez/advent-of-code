const fs = require('fs');
const inputLines = fs.readFileSync(process.argv[2], 'utf-8').split('\n').filter(s => !!s);

const leftList = [];
const rightList = [];

inputLines.forEach(line => {
  const [left, right] = line.split(/\s+/).map(s => parseInt(s, 10));
  leftList[left] = leftList[left] ? leftList[left] + 1 : 1;
  rightList[right] = rightList[right] ? rightList[right] + 1 : 1;
});

let sum = 0;

for (let i = 0; i < leftList.length; i++) {
  if (!leftList[i]) continue;
  sum += i * leftList[i] * (rightList[i] ? rightList[i] : 0);
}

console.log(sum);
