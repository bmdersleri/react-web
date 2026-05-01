function filterModulesBySearchText(modules, searchText) {
  const normalizedSearchText = searchText.trim().toLocaleLowerCase("tr-TR");

  return modules.filter((module) => {
    const normalizedTitle = module.title.toLocaleLowerCase("tr-TR");
    return normalizedTitle.includes(normalizedSearchText);
  });
}

const modules = [
  { id: "announcements", title: "Duyurular" },
  { id: "events", title: "Etkinlikler" },
  { id: "notes", title: "Not Paylaşımı" },
  { id: "profile", title: "Profil" }
];

const query = "du";
const filteredModules = filterModulesBySearchText(modules, query);

console.log(`query: ${query}`);
console.log(filteredModules.map((module) => module.title).join(", "));
console.log(`count: ${filteredModules.length}`);
