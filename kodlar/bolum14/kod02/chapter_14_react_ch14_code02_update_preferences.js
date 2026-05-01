const initialStore = {
  preferences: {
    theme: "light",
    notificationsEnabled: true,
    compactMode: false,
  },
};

function updatePreferences(store, updates) {
  return {
    ...store,
    preferences: {
      ...store.preferences,
      ...updates,
    },
  };
}

const nextStore = updatePreferences(initialStore, {
  theme: "dark",
  compactMode: true,
});

console.log(
  `old=${initialStore.preferences.theme} | ` +
    `new=${nextStore.preferences.theme} | ` +
    `sameObject=${initialStore === nextStore}`
);
