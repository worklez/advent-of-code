const fs = require('fs');
const inputLines = fs.readFileSync(process.argv[2], 'utf-8').split('\n').filter(s => !!s);

const matrix = inputLines.map(l => l.split(''));

function findAntinodes(x1, y1, x2, y2) {
  const p1_1 = {
    x: 2 * x1 - x2,
    y: 2 * y1 - y2
  };
  const p1_2 = {
    x: (2 * x1 + x2) / 3,
    y: (2 * y1 + y2) / 3
  };

  const p2_1 = {
    x: (x1 + 2 * x2) / 3,
    y: (y1 + 2 * y2) / 3
  };
  const p2_2 = {
    x: -x1 + 2 * x2,
    y: -y1 + 2 * y2
  };

  return [p1_1, p1_2, p2_1, p2_2];
}

function isValidAntinode({x, y}) {
  const maxY = matrix.length - 1;
  const maxX = matrix[0].length - 1;
  if (x < 0 || x > maxX || y < 0 || y > maxY) return false;
  if (Math.floor(x) != x) return false;
  if (Math.floor(y) != y) return false;
  return true;
}

function isAntenna(i, j) {
  const c = matrix[j][i].charCodeAt(0);
  return (c >= 97 && c <= 122) || (c >= 65 && c <= 90) || (c >= 48 && c <= 57);
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
      possibleAntinodes.filter(isValidAntinode).forEach(({x, y}) => antinodes.add(`${x}|${y}`));
    }
  }
}

console.log(antinodes.size)
