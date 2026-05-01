const componentInventory = [
  "AppShell",
  "Header",
  "MainNavigation",
  "HeroPanel",
  "ModuleGrid",
  "ModuleCard",
  "AnnouncementList",
  "AnnouncementItem",
  "EventPreview",
  "UserSummary",
  "Footer"
];

function summarizeInventory(components) {
  return `KampüsHub bileşen sayısı: ${components.length}`;
}

console.log(summarizeInventory(componentInventory));
