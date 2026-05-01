const campusHubStore = {
  preferences: {
    theme: "dark",
    notificationsEnabled: false,
    compactMode: true,
  },
  ui: {
    sidebarOpen: true,
    activePanel: "announcements",
  },
  api: {
    loading: false,
    lastError: null,
  },
};

function selectPersistedPreferences(store) {
  return {
    theme: store.preferences.theme,
    notificationsEnabled: store.preferences.notificationsEnabled,
    compactMode: store.preferences.compactMode,
  };
}

const persisted = selectPersistedPreferences(campusHubStore);
console.log(`persisted keys: ${Object.keys(persisted).sort().join(",")}`);
