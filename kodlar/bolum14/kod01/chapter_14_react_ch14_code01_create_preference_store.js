function createInitialPreferenceStore() {
  return {
    preferences: {
      theme: "light",
      notificationsEnabled: true,
      compactMode: false,
    },
    announcementFilter: {
      category: "all",
      onlyPinned: false,
    },
    ui: {
      sidebarOpen: false,
      activePanel: "home",
    },
  };
}

const store = createInitialPreferenceStore();
console.log(
  `theme=${store.preferences.theme} | ` +
    `notifications=${store.preferences.notificationsEnabled} | ` +
    `category=${store.announcementFilter.category}`
);
