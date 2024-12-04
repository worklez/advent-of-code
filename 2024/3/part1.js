const fs = require('fs');
const input = fs.readFileSync(process.argv[2], 'utf-8');

const found = input.match(/mul\((?<a>\d+),(?<b>\d+)\)/g);

let sum = 0;

found.forEach(m => {
  const args = m.match(/mul\((?<a>\d+),(?<b>\d+)\)/);
  sum += parseInt(args.groups.a, 10) * parseInt(args.groups.b, 10);
});

console.log(sum);
