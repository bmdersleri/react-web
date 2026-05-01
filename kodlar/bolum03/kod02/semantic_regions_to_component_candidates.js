const semanticRegions = [
  { tag: "header", role: "application header", repeatable: true },
  { tag: "nav", role: "main navigation", repeatable: true },
  { tag: "main", role: "main content", repeatable: false },
  { tag: "article", role: "module card", repeatable: true },
  { tag: "footer", role: "application footer", repeatable: true }
];

const componentNameByRole = {
  "application header": "Header",
  "main navigation": "MainNavigation",
  "main content": "MainContent",
  "module card": "ModuleCard",
  "application footer": "Footer"
};

function createComponentCandidateList(regions) {
  return regions
    .filter((region) => region.repeatable || region.tag === "main")
    .map((region) => componentNameByRole[region.role])
    .join(", ");
}

console.log(createComponentCandidateList(semanticRegions));
