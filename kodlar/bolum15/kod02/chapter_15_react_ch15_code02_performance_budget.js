const assets = [
  { name: "main.js", sizeKb: 310 },
  { name: "vendor.js", sizeKb: 240 },
  { name: "style.css", sizeKb: 48 }
];

function checkPerformanceBudget(files, maxKb) {
  const overBudget = files.filter((file) => file.sizeKb > maxKb).map((file) => file.name);
  return {
    status: overBudget.length === 0 ? "pass" : "warn",
    overBudget
  };
}

const result = checkPerformanceBudget(assets, 250);
console.log(`budget=${result.status} | over=${result.overBudget.join(",") || "none"}`);
