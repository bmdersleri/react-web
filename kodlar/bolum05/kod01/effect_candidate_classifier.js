const tasks = [
  { name: "documentTitle", touchesExternalSystem: true },
  { name: "visibleModules", touchesExternalSystem: false },
  { name: "timer", touchesExternalSystem: true },
  { name: "activeCssClass", touchesExternalSystem: false }
];

function classifyTask(task) {
  return task.touchesExternalSystem ? "effect" : "render";
}

for (const task of tasks) {
  console.log(`${task.name}: ${classifyTask(task)}`);
}
