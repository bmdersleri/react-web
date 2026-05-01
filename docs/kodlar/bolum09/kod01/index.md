---
title: "react_ch09_code01_module_filter.js"
code_id: "react_ch09_code01"
language: "javascript"
test_status: "passed"
---

# react_ch09_code01_module_filter.js

**Kod kimliği:** `react_ch09_code01`  
**Bölüm kimliği:** `chapter_09`  
**Dosya:** `react_ch09_code01_module_filter.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum09/kod01/react_ch09_code01_module_filter.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum09/kod01
- Repository yolu: `kodlar/bolum09/kod01/react_ch09_code01_module_filter.js`

## Kaynak kod

```javascript
const modules = [
  { id: 1, label: "Duyuru", area: "academic", pinned: true },
  { id: 2, label: "Etkinlik", area: "social", pinned: true },
  { id: 3, label: "Not Paylaşımı", area: "academic", pinned: false },
  { id: 4, label: "Profil", area: "user", pinned: false }
];

function filterCampusModules(items, filter) {
  const query = filter.query.trim().toLowerCase();
  return items.filter((item) => {
    const matchesQuery = item.label.toLowerCase().includes(query);
    const matchesPinned = filter.onlyPinned ? item.pinned : true;
    return matchesQuery && matchesPinned;
  });
}

const visibleModules = filterCampusModules(modules, {
  query: "",
  onlyPinned: true
});

console.log(
  `filtered=${visibleModules.length};empty=${visibleModules.length === 0};labels=${visibleModules.map((item) => item.label).join("|")}`
);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
