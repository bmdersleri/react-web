function evaluateHookDesign(candidate) {
  const checks = [
    candidate.name.startsWith("use"),
    candidate.hasSingleResponsibility,
    candidate.hasExplicitInputs,
    candidate.hasTestableCore
  ];

  const score = checks.filter(Boolean).length;
  return {
    score,
    total: checks.length,
    ready: score === checks.length
  };
}

const result = evaluateHookDesign({
  name: "useCampusModules",
  hasSingleResponsibility: true,
  hasExplicitInputs: true,
  hasTestableCore: true
});

console.log(`name=useCampusModules;score=${result.score}/${result.total};ready=${result.ready}`);
