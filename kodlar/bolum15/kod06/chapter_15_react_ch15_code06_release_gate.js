const checks = [
  { name: "tests", passed: true },
  { name: "build", passed: true },
  { name: "accessibility", passed: false },
  { name: "routing", passed: true },
  { name: "env", passed: false }
];

function summarizeReleaseGate(items) {
  const failed = items.filter((item) => !item.passed).map((item) => item.name);
  return {
    release: failed.length === 0 ? "ready" : "blocked",
    failed
  };
}

const summary = summarizeReleaseGate(checks);
console.log(`release=${summary.release} | failed=${summary.failed.join(",") || "none"}`);
