const packageJson = {
  scripts: {
    dev: "vite",
    test: "vitest",
    build: "vite build",
    preview: "vite preview"
  }
};

function validateDeploymentScripts(config) {
  const scripts = config.scripts || {};
  const required = ["build", "preview", "test"];
  const missing = required.filter((name) => !scripts[name]);
  return {
    ok: missing.length === 0,
    missing,
    build: scripts.build,
    preview: scripts.preview
  };
}

const result = validateDeploymentScripts(packageJson);
console.log(`scripts=${result.ok ? "ok" : "missing"} | build=${result.build} | preview=${result.preview}`);
