const dashboardState = {
  appName: "KampüsHub",
  selectedModuleId: null,
  unreadAnnouncementCount: 4,
  isProfileOpen: false
};

function summarizeDashboardState(state) {
  const selected = state.selectedModuleId ?? "none";
  return `${state.appName} | selectedModule: ${selected} | unread: ${state.unreadAnnouncementCount}`;
}

console.log(summarizeDashboardState(dashboardState));
