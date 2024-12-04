const fs = require('fs');
const input = fs.readFileSync(process.argv[2], 'utf-8');

const found = input.match(/mul\((?<a>\d+),(?<b>\d+)\)|do\(\)|don't\(\)/g);

let sum = 0;
let isEnabled = true;

found.forEach(m => {
  if (m === "do()") { isEnabled = true; return }
  if (m === "don't()") { isEnabled = false; return }
  if (!isEnabled) { return }
  const args = m.match(/mul\((?<a>\d+),(?<b>\d+)\)/);
  sum += parseInt(args.groups.a, 10) * parseInt(args.groups.b, 10);
});

console.log(sum);
