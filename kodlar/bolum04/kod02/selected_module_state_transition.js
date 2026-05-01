function selectModule(previousState, moduleId) {
  return {
    ...previousState,
    selectedModuleId: moduleId
  };
}

const beforeState = {
  selectedModuleId: null,
  unreadAnnouncementCount: 4
};

const afterState = selectModule(beforeState, "events");

console.log(`before: ${beforeState.selectedModuleId ?? "none"}`);
console.log(`after: ${afterState.selectedModuleId}`);
console.log(`changed: ${beforeState !== afterState}`);
