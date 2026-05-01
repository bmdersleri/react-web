function buildModulesModel(modules, filter) {
  const visibleModules = modules.filter((module) => {
    const matchesArea = filter.area === "all" || module.area === filter.area;
    return matchesArea;
  });

  return {
    visibleModules,
    hasPinned: visibleModules.some((module) => module.pinned)
  };
}

function buildAnnouncementsModel(announcements, category) {
  const visible = announcements.filter((announcement) => {
    return category === "all" || announcement.category === category;
  });

  return {
    visible,
    message: `${visible.length} duyuru listeleniyor`
  };
}

function buildDashboardModel(input) {
  const moduleModel = buildModulesModel(input.modules, input.moduleFilter);
  const announcementModel = buildAnnouncementsModel(input.announcements, input.announcementCategory);

  return {
    theme: input.preferences.theme,
    visibleModules: moduleModel.visibleModules,
    hasPinned: moduleModel.hasPinned,
    announcementMessage: announcementModel.message
  };
}

const dashboard = buildDashboardModel({
  preferences: { theme: "dark" },
  moduleFilter: { area: "academic" },
  announcementCategory: "academic",
  modules: [
    { label: "Duyuru", area: "academic", pinned: true },
    { label: "Not Paylaşımı", area: "academic", pinned: false },
    { label: "Etkinlik", area: "social", pinned: true }
  ],
  announcements: [
    { title: "Final takvimi", category: "academic" },
    { title: "Danışmanlık saatleri", category: "academic" },
    { title: "Konser duyurusu", category: "social" }
  ]
});

console.log(
  `visibleModules=${dashboard.visibleModules.length};theme=${dashboard.theme};hasPinned=${dashboard.hasPinned};announcementMessage=${dashboard.announcementMessage}`
);
