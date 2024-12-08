const fs = require('fs');
const inputLines = fs.readFileSync(process.argv[2], 'utf-8').split('\n').filter(s => !!s);

const matrix = inputLines.map(l => l.split(''));

const maxY = matrix.length - 1;
const maxX = matrix[0].length - 1;

function findAntinodes(x1, y1, x2, y2) {
  const slope = (y2 - y1) / (x2 - x1);
  const intercept = y1 - slope * x1;
  const points = [];
  for (let x = 0; x <= maxX; x++) {
    for (let y = 0; y <= maxY; y++) {
      if (slope*x + intercept === y) points.push({x, y});
    }
  }

  return points;
}

function isAntenna(i, j) {
  return matrix[j][i] != '.';
}

const antennasByFrequency = {};

for (let i = 0; i < matrix.length; i++) {
  for (let j = 0; j < matrix[0].length; j++) {
    if (isAntenna(i, j)) {
      if (!antennasByFrequency[matrix[j][i]]) antennasByFrequency[matrix[j][i]] = [];
      antennasByFrequency[matrix[j][i]].push([i, j]);
    }
  }
}

const antinodes = new Set();

for (let antennas of Object.values(antennasByFrequency)) {
  for (let i = 0; i < antennas.length; i++) {
    for (let j = 0; j < antennas.length; j++) {
      if (i == j) continue;
      const possibleAntinodes = findAntinodes(...antennas[i], ...antennas[j]);
      possibleAntinodes.forEach(({x, y}) => antinodes.add(`${x}|${y}`));
    }
  }
}

antinodes.forEach(a => {
  const [x,y] = a.split('|').map(s => parseInt(s, 10));
  matrix[y][x] = '#';
})

console.log(matrix.map(line => line.join('')).join('\n'))

// answer too low :shrug:
console.log(antinodes.size)
