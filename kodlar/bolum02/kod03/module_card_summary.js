const modules = [
  { title: "Duyurular", newItems: 4 },
  { title: "Etkinlikler", newItems: 2 },
  { title: "Not Paylaşımı", newItems: 7 },
  { title: "Profil", newItems: 1 },
];

const summaries = modules.map((moduleItem) => {
  return `${moduleItem.title}: ${moduleItem.newItems} yeni kayıt`;
});

console.log(summaries.join("\n"));
