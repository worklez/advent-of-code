const fs = require('fs');
const inputLines = fs.readFileSync(process.argv[2], 'utf-8').split('\n').filter(s => !!s);

const matrix = inputLines.map(line => line.split(''));

function safeRead(x, y) {
  if (x < 0 || x >= matrix[0].length) return '';
  if (y < 0 || y >= matrix.length) return '';
  return matrix[y][x];
}

function readDiagonally1(x, y) {
  return safeRead(x - 1, y - 1) + safeRead(x, y) + safeRead(x + 1, y + 1);
}

function readDiagonally2(x, y) {
  return safeRead(x + 1, y - 1) + safeRead(x, y) + safeRead(x - 1, y + 1);
}

let sum = 0;

for (let y = 0; y < matrix.length; y++) {
  for (let x = 0; x < matrix[0].length; x++) {
    const matches = [
      readDiagonally1(x, y),
      readDiagonally2(x, y),
      readDiagonally1(x, y).split('').reverse().join(''),
      readDiagonally2(x, y).split('').reverse().join(''),
    ].filter(c => c == "MAS").length;
    if (matches >= 2) {
      sum++;
    }
  }
}
console.log(sum);
