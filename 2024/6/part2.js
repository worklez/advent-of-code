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

function format(pos, dir) { return `${pos[0]}|${pos[1]}|${dir}` }

const obstacleCells = new Set();
function run(currentPosition, direction, visitedCells, addedObstacle) {
  while (!isOutOfBounds(currentPosition)) {
    visitedCells.add(format(currentPosition, direction));
    const nextPosition = [
      currentPosition[0] + directions[direction][0],
      currentPosition[1] + directions[direction][1],
    ]
    if (isOutOfBounds(nextPosition)) { break; }
    if (addedObstacle) {
      if (visitedCells.has(format(nextPosition, direction))) {
        return true;
      }
    }
    if (matrix[nextPosition[1]][nextPosition[0]] === '#' || (addedObstacle && nextPosition[1] == addedObstacle[1] && nextPosition[0] == addedObstacle[0])) {
      direction = nextDirections[direction];
    }
    else {
      currentPosition = nextPosition;
    }
  }
  return false;
}

const visitedCells = new Set();
const startPos = findCurrentPosition();
run([...startPos], 'up', visitedCells, null);

visitedCells.forEach(cell => {
  const obstacle = cell.split('|').splice(0, 2).map(n => parseInt(n, 10));
  const loopDetected = run([...startPos], 'up', new Set(), obstacle);
  if (loopDetected) obstacleCells.add(format(obstacle, ''));
});

console.log(obstacleCells.size);
