const announcements = [
  { id: 1, title: "Vize takvimi", category: "Ders" },
  { id: 2, title: "React atölyesi", category: "Etkinlik" },
  { id: 3, title: "Final duyurusu", category: "Ders" },
  { id: 4, title: "Kütüphane saatleri", category: "Kampüs" },
  { id: 5, title: "Proje teslimi", category: "Ders" },
  { id: 6, title: "Spor turnuvası", category: "Etkinlik" }
];

function filterAnnouncements(items, category) {
  return items.filter((item) => item.category === category);
}

function chooseMemoStrategy({ listSize, queryChanged, calculationMs }) {
  if (listSize >= 5 && !queryChanged && calculationMs >= 4) {
    return {
      strategy: "memoize",
      reason: "large-list-stable-query"
    };
  }
  return {
    strategy: "direct",
    reason: "cheap-or-changing"
  };
}

const visible = filterAnnouncements(announcements, "Ders");
const decision = chooseMemoStrategy({
  listSize: announcements.length,
  queryChanged: false,
  calculationMs: 6
});

console.log(`visible=${visible.length} | strategy=${decision.strategy} | reason=${decision.reason}`);
