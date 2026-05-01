const dashboardSources = [
  { key: "announcements", status: "success", count: 5 },
  { key: "events", status: "success", count: 2 },
  { key: "notes", status: "success", count: 8 },
  { key: "profile", status: "warning", count: 1 },
];

const cards = dashboardSources.filter((source) => source.status === "success");
const alerts = dashboardSources.filter((source) => source.status !== "success");
const dashboardStatus = cards.length >= 3 ? "ready" : "partial";

console.log(
  `dashboard=${dashboardStatus} | cards=${cards.length} | alerts=${alerts.length}`,
);
