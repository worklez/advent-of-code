const fs = require('fs');
const [edgesText, updatesText] = fs.readFileSync(process.argv[2], 'utf-8').split('\n\n')
const edgesLines = edgesText.split('\n').filter(s => !!s);
const updatesLines = updatesText.split('\n').filter(s => !!s);

const edges = new Set(edgesLines)
const updates = updatesLines.map(l => l.split(',').map(n => parseInt(n, 10)))

function fixUpdate(update) {
  let fixed = false;
  for (let i = 1; i < update.length; i++) {
    for (let j = 0; j < i; j++) {
      if (edges.has(`${update[i] + "|" + update[j]}`)) {
        const tmp = update[i];
        update[i] = update[j];
        update[j] = tmp;
        fixed = true;
      }
    } 
  }
  return fixed;
}

let sum = 0;
for (let i = 0; i < updates.length; i++) {
  const update = updates[i];
  const isFixed = fixUpdate(update);
  if (isFixed) { sum += update[Math.floor(update.length/2)] }
}
console.log(sum)
