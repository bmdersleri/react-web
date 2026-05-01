function createMemoizedModuleSummary() {
  let previousModules = null;
  let previousSearchText = null;
  let previousResult = null;

  return function getModuleSummary(modules, searchText) {
    if (previousModules === modules && previousSearchText === searchText) {
      return previousResult;
    }

    const normalizedSearch = searchText.trim().toLowerCase();
    const visibleModules = modules.filter((module) =>
      module.title.toLowerCase().includes(normalizedSearch)
    );

    previousModules = modules;
    previousSearchText = searchText;
    previousResult = {
      visibleModules,
      visibleCount: visibleModules.length,
      totalCount: modules.length
    };

    return previousResult;
  };
}

const modules = [
  { id: "announcements", title: "Duyurular" },
  { id: "events", title: "Etkinlikler" },
  { id: "notes", title: "Not Paylaşımı" },
  { id: "profile", title: "Profil" }
];

const getModuleSummary = createMemoizedModuleSummary();
const first = getModuleSummary(modules, "i");
const second = getModuleSummary(modules, "i");

console.log(`visible:${first.visibleCount}`);
console.log(`total:${first.totalCount}`);
console.log(`cached:${first === second}`);
console.log("memo-ok");
