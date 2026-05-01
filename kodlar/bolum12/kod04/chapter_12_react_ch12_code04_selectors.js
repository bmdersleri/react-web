const state = {
  announcements: {
    items: [
      { id: "a1", title: "Vize takvimi yayımlandı" },
      { id: "a2", title: "Kariyer günü başvuruları" },
      { id: "a3", title: "Kütüphane çalışma saatleri" },
    ],
    readIds: ["a1"],
    pinnedIds: ["a3"],
  },
};

function selectPinnedUnreadAnnouncements(appState) {
  const { items, readIds, pinnedIds } = appState.announcements;
  return items.filter(
    (item) => pinnedIds.includes(item.id) && !readIds.includes(item.id)
  );
}

const result = selectPinnedUnreadAnnouncements(state)
  .map((item) => `${item.id}:${item.title}`)
  .join(", ");

console.log(result);
