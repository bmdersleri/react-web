---
title: "react_ch09_code05_dashboard_model.js"
code_id: "react_ch09_code05"
language: "javascript"
test_status: "passed"
---

# react_ch09_code05_dashboard_model.js

**Kod kimliği:** `react_ch09_code05`  
**Bölüm kimliği:** `chapter_09`  
**Dosya:** `react_ch09_code05_dashboard_model.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum09/kod05/react_ch09_code05_dashboard_model.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum09/kod05
- Repository yolu: `kodlar/bolum09/kod05/react_ch09_code05_dashboard_model.js`

## Kaynak kod

```javascript
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
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
