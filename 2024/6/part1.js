const fs = require('fs');
const inputLines = fs.readFileSync(process.argv[2], 'utf-8').split('\n').filter(s => !!s);

const matrix = inputLines.map(l => l.split(''));

const directions = {
  up:    [ 0, -1],
  down:  [ 0,  1],
  left:  [-1,  0],
  right: [ 1,  0],
};

const nextDirections = {
  up: 'right',
  down: 'left',
  left: 'up',
  right: 'down',
};

function findCurrentPosition() {
  for (let y = 0; y < matrix.length; y++) {
    for (let x = 0; x < matrix[0].length; x++) {
      if (matrix[y][x] === '^') {
        return [x, y];
      }
    }
  }
  return null;
}

function isOutOfBounds(pos) {
  return pos[1] < 0 || pos[1] >= matrix.length || pos[0] < 0 || pos[0] >= matrix[0].length;
}

function format(pos) { return `${pos[0]}|${pos[1]}` }
const visitedCells = new Set();
function visit(pos) { visitedCells.add(format(pos)) };

let direction = 'up';
let currentPosition = findCurrentPosition();

while (!isOutOfBounds(currentPosition)) {
  visit(currentPosition);
  const nextPosition = [
    currentPosition[0] + directions[direction][0],
    currentPosition[1] + directions[direction][1],
  ]
  if (isOutOfBounds(nextPosition)) { break; }
  if (matrix[nextPosition[1]][nextPosition[0]] === '#') direction = nextDirections[direction];
  else currentPosition = nextPosition;
}
console.log(visitedCells.size)
