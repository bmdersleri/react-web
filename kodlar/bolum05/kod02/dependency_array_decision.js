const effectPatterns = [
  { dependencyArray: undefined, label: "noArray" },
  { dependencyArray: [], label: "emptyArray" },
  { dependencyArray: ["selectedModuleId"], label: "selectedModuleId" }
];

function describePattern(pattern) {
  if (pattern.dependencyArray === undefined) return "every-render";
  if (pattern.dependencyArray.length === 0) return "mount-only";
  return "when-value-changes";
}

for (const pattern of effectPatterns) {
  console.log(`${pattern.label}: ${describePattern(pattern)}`);
}
