const modules = [
  { id: "announcements", title: "Duyurular", status: "3 yeni duyuru" },
  { id: "events", title: "Etkinlikler", status: "2 yaklaşan etkinlik" },
  { id: "notes", title: "Not Paylaşımı", status: "5 yeni not" },
  { id: "profile", title: "Profil", status: "Profil %80 tamamlandı" }
];

const summaries = modules.map((module) => `${module.title} -> ${module.status}`);

console.log(summaries.join("\n"));
console.log(`Toplam modül: ${modules.length}`);
