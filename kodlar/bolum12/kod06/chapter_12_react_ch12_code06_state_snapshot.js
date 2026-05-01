const appState = {
  preferences: {
    theme: "dark",
    notificationsEnabled: true,
    compactMode: false,
  },
  announcements: {
    items: [
      { id: "a1", title: "Vize takvimi" },
      { id: "a2", title: "Seminer duyurusu" },
    ],
    readIds: ["a1"],
    pinnedIds: [],
  },
  notes: {
    items: [{ id: "n1", title: "React Router özeti" }],
  },
};

function summarizeState(state) {
  return [
    `announcements: ${state.announcements.items.length}`,
    `theme: ${state.preferences.theme}`,
    `notes: ${state.notes.items.length}`,
  ].join(" | ");
}

console.log(summarizeState(appState));
