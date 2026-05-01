function buildCampusHubViewModel({ modules, searchText, themeName, selectedModuleId }) {
  const normalizedSearch = searchText.trim().toLowerCase();
  const visibleModules = modules.filter((module) =>
    module.title.toLowerCase().includes(normalizedSearch)
  );
  const selectedModule = modules.find((module) => module.id === selectedModuleId) ?? null;

  return {
    themeName,
    visibleModules,
    selectedModule,
    summaryText: `${visibleModules.length}/${modules.length} modül gösteriliyor`
  };
}

const modules = [
  { id: "announcements", title: "Duyurular" },
  { id: "events", title: "Etkinlikler" },
  { id: "notes", title: "Not Paylaşımı" },
  { id: "profile", title: "Profil" }
];

const viewModel = buildCampusHubViewModel({
  modules,
  searchText: "i",
  themeName: "academic-light",
  selectedModuleId: "events"
});

console.log(`theme:${viewModel.themeName}`);
console.log(`visibleModules:${viewModel.visibleModules.length}`);
console.log(`selected:${viewModel.selectedModule.id}`);
console.log(viewModel.summaryText);
console.log("view-model-ok");
