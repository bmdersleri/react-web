const gates = [
  { name: "routes", passed: true },
  { name: "forms", passed: true },
  { name: "api-states", passed: true },
  { name: "unit-tests", passed: true },
  { name: "accessibility", passed: false },
  { name: "build", passed: true },
  { name: "smoke-test", passed: false },
];

const failed = gates.filter((gate) => !gate.passed).map((gate) => gate.name);
const releaseStatus = failed.length === 0 ? "ready" : "blocked";

console.log(`release=${releaseStatus} | failed=${failed.join(",") || "none"}`);
