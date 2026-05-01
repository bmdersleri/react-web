function decideStateOwner(stateName) {
  const owners = {
    noteForm: "local-form",
    theme: "zustand",
    notifications: "redux",
    currentRoute: "router",
    announcements: "server-cache",
  };

  return owners[stateName] ?? "component-state";
}

const summary = [
  `form=${decideStateOwner("noteForm")}`,
  `theme=${decideStateOwner("theme")}`,
  `notifications=${decideStateOwner("notifications")}`,
  `route=${decideStateOwner("currentRoute")}`,
].join(" | ");

console.log(summary);
