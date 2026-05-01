const modules = [
  { id: "announcements", title: "Duyurular", isActive: true, unreadCount: 3 },
  { id: "events", title: "Etkinlikler", isActive: true, unreadCount: 1 },
  { id: "notes", title: "Not Paylaşımı", isActive: false, unreadCount: 0 },
  { id: "profile", title: "Profil", isActive: true, unreadCount: 0 }
];

const activeModuleTitles = modules
  .filter((module) => module.isActive)
  .map((module) => module.title);

console.log(`Aktif modüller: ${activeModuleTitles.join(", ")}`);
