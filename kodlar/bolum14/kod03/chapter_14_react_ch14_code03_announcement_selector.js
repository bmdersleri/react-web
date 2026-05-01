const announcements = [
  { id: "a1", title: "Vize takvimi", category: "academic", pinned: true },
  { id: "a2", title: "Kariyer günü", category: "career", pinned: false },
  { id: "a3", title: "Kulüp buluşması", category: "social", pinned: true },
];

const store = {
  announcementFilter: {
    category: "academic",
    onlyPinned: true,
  },
};

function selectVisibleAnnouncements(state, list) {
  const { category, onlyPinned } = state.announcementFilter;
  return list.filter((item) => {
    const categoryMatch = category === "all" || item.category === category;
    const pinnedMatch = !onlyPinned || item.pinned;
    return categoryMatch && pinnedMatch;
  });
}

const visible = selectVisibleAnnouncements(store, announcements);
console.log(`filtered=${visible.length} | first=${visible[0].title}`);
