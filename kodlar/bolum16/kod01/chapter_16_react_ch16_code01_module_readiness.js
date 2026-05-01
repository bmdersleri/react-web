const modules = [
  { name: "routing", ready: true },
  { name: "announcements", ready: true },
  { name: "events", ready: true },
  { name: "notes", ready: true },
  { name: "profile", ready: true },
  { name: "preferences", ready: true },
  { name: "tests", ready: true },
  { name: "accessibility", ready: false },
];

const readyCount = modules.filter((module) => module.ready).length;
const missing = modules
  .filter((module) => !module.ready)
  .map((module) => module.name)
  .join(",") || "none";

console.log(`modules=${readyCount}/${modules.length} | missing=${missing}`);
