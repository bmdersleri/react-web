const modules = [
  { id: 1, label: "Duyuru", area: "academic", pinned: true },
  { id: 2, label: "Etkinlik", area: "social", pinned: true },
  { id: 3, label: "Not Paylaşımı", area: "academic", pinned: false },
  { id: 4, label: "Profil", area: "user", pinned: false }
];

function filterCampusModules(items, filter) {
  const query = filter.query.trim().toLowerCase();
  return items.filter((item) => {
    const matchesQuery = item.label.toLowerCase().includes(query);
    const matchesPinned = filter.onlyPinned ? item.pinned : true;
    return matchesQuery && matchesPinned;
  });
}

const visibleModules = filterCampusModules(modules, {
  query: "",
  onlyPinned: true
});

console.log(
  `filtered=${visibleModules.length};empty=${visibleModules.length === 0};labels=${visibleModules.map((item) => item.label).join("|")}`
);
