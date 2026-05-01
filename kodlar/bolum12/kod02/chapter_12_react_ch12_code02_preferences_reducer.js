const initialPreferences = {
  theme: "light",
  notificationsEnabled: true,
  compactMode: false,
};

function preferencesReducer(state = initialPreferences, action) {
  switch (action.type) {
    case "preferences/setTheme":
      return { ...state, theme: action.payload };
    case "preferences/toggleNotifications":
      return { ...state, notificationsEnabled: !state.notificationsEnabled };
    default:
      return state;
  }
}

const afterTheme = preferencesReducer(initialPreferences, {
  type: "preferences/setTheme",
  payload: "dark",
});

const afterToggle = preferencesReducer(afterTheme, {
  type: "preferences/toggleNotifications",
});

const notificationLabel = afterToggle.notificationsEnabled ? "open" : "closed";
console.log(`${afterToggle.theme} | ${notificationLabel}`);
