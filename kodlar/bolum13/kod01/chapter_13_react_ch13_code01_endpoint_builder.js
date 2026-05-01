function buildEndpoint(resource, params = {}) {
  const basePaths = {
    announcements: "/api/announcements",
    events: "/api/events",
    notes: "/api/notes",
    preferences: "/api/profile/preferences",
  };

  const basePath = basePaths[resource];
  if (!basePath) {
    throw new Error(`Unknown resource: ${resource}`);
  }

  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, String(value));
    }
  });

  const queryString = query.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

console.log(buildEndpoint("events", { category: "academic", limit: 5 }));
