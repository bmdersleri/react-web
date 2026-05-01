function validatePublicEnv(env) {
  const requiredKeys = ["VITE_API_BASE_URL", "MODE"];
  const missing = requiredKeys.filter((key) => !env[key]);

  return {
    ok: missing.length === 0,
    missing,
    apiBase: env.VITE_API_BASE_URL,
    mode: env.MODE,
  };
}

const result = validatePublicEnv({
  VITE_API_BASE_URL: "/api",
  MODE: "production",
});

console.log(
  `env=${result.ok ? "ok" : "missing"} | apiBase=${result.apiBase} | mode=${result.mode}`,
);
