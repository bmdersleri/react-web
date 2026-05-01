const announcements = [
  { id: 1, title: "Final sınav takvimi açıklandı", category: "academic" },
  { id: 2, title: "Bahar şenliği başlıyor", category: "social" },
  { id: 3, title: "Kütüphane çalışma saatleri güncellendi", category: "campus" }
];

function buildAnnouncementFilterModel(items, filter) {
  const query = filter.query.trim().toLowerCase();
  const visible = items.filter((item) => {
    const matchesQuery = item.title.toLowerCase().includes(query);
    const matchesCategory = filter.category === "all" || item.category === filter.category;
    return matchesQuery && matchesCategory;
  });

  return {
    visible,
    isEmpty: visible.length === 0,
    message: visible.length === 0 ? "Uygun duyuru bulunamadı" : `${visible.length} duyuru listeleniyor`
  };
}

const model = buildAnnouncementFilterModel(announcements, {
  query: "final",
  category: "academic"
});

console.log(`visible=${model.visible.length};empty=${model.isEmpty};message=${model.message}`);
