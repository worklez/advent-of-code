const fs = require('fs');
const inputLines = fs.readFileSync(process.argv[2], 'utf-8').split('\n').filter(s => !!s);

const matrix = inputLines.map(line => line.split(''));

function safeRead(x, y) {
  if (x < 0 || x >= matrix[0].length) return '';
  if (y < 0 || y >= matrix.length) return '';
  return matrix[y][x];
}

function readHorizontally(x, y) {
  return safeRead(x, y) + safeRead(x + 1, y) + safeRead(x + 2, y) + safeRead(x + 3, y);
}

function readHorizontallyBackwards(x, y) {
  return safeRead(x, y) + safeRead(x - 1, y) + safeRead(x - 2, y) + safeRead(x - 3, y);
}

function readVertically(x, y) {
  return safeRead(x, y) + safeRead(x, y + 1) + safeRead(x, y + 2) + safeRead(x, y + 3);
}

function readVerticallyBackwards(x, y) {
  return safeRead(x, y) + safeRead(x, y - 1) + safeRead(x, y - 2) + safeRead(x, y - 3);
}

function readDiagonally1(x, y) {
  return safeRead(x, y) + safeRead(x + 1, y + 1) + safeRead(x + 2, y + 2) + safeRead(x + 3, y + 3);
}

function readDiagonally2(x, y) {
  return safeRead(x, y) + safeRead(x - 1, y - 1) + safeRead(x - 2, y - 2) + safeRead(x - 3, y - 3);
}

function readDiagonally3(x, y) {
  return safeRead(x, y) + safeRead(x - 1, y + 1) + safeRead(x - 2, y + 2) + safeRead(x - 3, y + 3);
}

function readDiagonally4(x, y) {
  return safeRead(x, y) + safeRead(x + 1, y - 1) + safeRead(x + 2, y - 2) + safeRead(x + 3, y - 3);
}

let sum = 0;

for (let y = 0; y < matrix.length; y++) {
  for (let x = 0; x < matrix[0].length; x++) {
    const matches = [
      readHorizontally(x, y),
      readHorizontallyBackwards(x, y),
      readVertically(x, y),
      readVerticallyBackwards(x, y),
      readDiagonally1(x, y),
      readDiagonally2(x, y),
      readDiagonally3(x, y),
      readDiagonally4(x, y),
    ].filter(c => c == "XMAS").length;
    sum += matches;
  }
}
console.log(sum);
