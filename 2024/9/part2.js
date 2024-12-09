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

function mapFreeSpace(disk) {
  const map = []; // [(startIndex, size)]
  let i = 0;
  let startIndex = -1;
  while (i < disk.length) {
    if (disk[i] === '.') {
      startIndex = i;
    }
    while (i < disk.length && disk[i] === '.') i++;
    if (i < disk.length && i != startIndex && startIndex != -1) {
      map.push([startIndex, i - startIndex]);
      startIndex = -1;
    }
    i++;
  }
  return map;
}

function mapFiles(disk) {
  const files = [];
  let i = disk.length - 1;
  let currentFileId = -1;
  let currentFileEnd = -1;
  while (i >= 0) {
    if (disk[i] != '.') {
      currentFileId = disk[i];
      currentFileEnd = i;
    }
    while (i >= 0 && disk[i] === currentFileId) i--;
    if (i >= -1 && currentFileId !== -1) {
      files.push([currentFileId, i + 1, currentFileEnd - i]);
      currentFileId = -1;
      currentFileEnd = -1;
    } else {
      i--;
    }
  }
  return files;
}

function optimizeFileLocation(disk, freeSpaceMap, fileStartIndex, fileSize) {
  let freeSpaceIndex = -1;
  for (let i = 0; i < freeSpaceMap.length; i++) {
    const [_, size] = freeSpaceMap[i];
    if (size >= fileSize) {
      freeSpaceIndex = i;
      break;
    }
  }
  if (freeSpaceIndex === -1) {
    // no space found
    return false;
  }
  // reserve space
  const [freeSpaceStartIndex, freeSpaceSize] = freeSpaceMap[freeSpaceIndex];
  if (freeSpaceSize === fileSize) {
    freeSpaceMap.splice(freeSpaceIndex, 1);
  } else {
    freeSpaceMap[freeSpaceIndex] = [freeSpaceStartIndex + fileSize, freeSpaceSize - fileSize];
  }
  // move on disk
  for (let i = 0; i < fileSize; i++) {
    disk[freeSpaceStartIndex + i] = disk[fileStartIndex + i];
    disk[fileStartIndex + i] = '.';
  }
  return true;
}

function defrag(disk, freeSpaceMap, filesMap) {
  for (let i = 0; i < filesMap.length; i++) {
    optimizeFileLocation(disk, freeSpaceMap, filesMap[i][1], filesMap[i][2]);
  }
}

function checksum(disk) {
  let sum = 0;
  for (let i = 0; i < disk.length; i++) {
    if (disk[i] === '.') continue;
    sum += i * disk[i];
  }
  return sum;
}

const disk = unpack(inputLines[0]);
console.log(disk.join(''))
const freeSpaceMap = mapFreeSpace(disk);
const filesMap = mapFiles(disk);
console.log({freeSpaceMap, filesMap});
defrag(disk, freeSpaceMap, filesMap);
console.log(freeSpaceMap)
console.log(disk.join(''))
console.log(checksum(disk)) // answer is too high :shrug:
