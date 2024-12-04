const fs = require('fs');
const inputLines = fs.readFileSync(process.argv[2], 'utf-8').split('\n').filter(s => !!s);

let safeCount = 0;
inputLines.forEach(line => {
  const report = line.split(' ').map(s => parseInt(s, 10));
  safeCount += isReportSafe(report);
});

function isReportSafe(report) {
  if (report.length < 2) return true;
  if (report[0] == report[1]) return false;
  const isIncreasing = report[0] < report[1];
  for (let i = 0; i < report.length - 1; i++) {
    const current = report[i];
    const next = report[i+1];
    const step = Math.abs(current - next);
    if (step < 1 || step > 3) return false;
    if (isIncreasing && current > next) return false;
    if (!isIncreasing && current < next) return false;
  }
  return true;
}

console.log(safeCount);
