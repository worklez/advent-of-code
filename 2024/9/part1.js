const fs = require('fs');
const inputLines = fs.readFileSync(process.argv[2], 'utf-8').split('\n').filter(s => !!s);

function unpack(map) {
  const disk = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i]; j++) {
      disk.push(i % 2 === 1 ? '.' : i/2);
    }
  }
  return disk;
}

function defrag(disk) {
  let i = 0;
  let j = disk.length - 1;

  while (i < j) {
    while (i < disk.length && disk[i] !== '.') i++;
    while (j >= 0 && disk[j] === '.') j--;
    if (i < j) {
      disk[i] = disk[j];
      disk[j] = '.';
    }
  }
}

function checksum(disk) {
  let sum = 0;
  for (let i = 0; i < disk.length; i++) {
    if (disk[i] === '.') break;
    sum += i * disk[i];
  }
  return sum;
}

const disk = unpack(inputLines[0]);
console.log(disk.join(''))
defrag(disk);
console.log(disk.join(''))
console.log(checksum(disk))
