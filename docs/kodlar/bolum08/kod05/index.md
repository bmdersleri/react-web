---
code_id: "react_ch08_code05"
language: "javascript"
test_status: "passed"
title: "campushub_dashboard_view_model"
parent: "Bölüm 8: İleri Hooks"
grand_parent: "Kod Örnekleri"
---

# campushub_dashboard_view_model

**Kod kimliği:** `react_ch08_code05`  
**Bölüm kimliği:** `chapter_08`  
**Dosya:** `campushub_dashboard_view_model.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum08/kod05/campushub_dashboard_view_model.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum08/kod05
- Repository yolu: `kodlar/bolum08/kod05/campushub_dashboard_view_model.js`

## Kaynak kod

```javascript
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
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
