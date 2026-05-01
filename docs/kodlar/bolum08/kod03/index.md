---
title: "memoized_module_summary"
code_id: "react_ch08_code03"
language: "javascript"
test_status: "passed"
---

# memoized_module_summary

**Kod kimliği:** `react_ch08_code03`  
**Bölüm kimliği:** `chapter_08`  
**Dosya:** `memoized_module_summary.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum08/kod03/memoized_module_summary.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum08/kod03
- Repository yolu: `kodlar/bolum08/kod03/memoized_module_summary.js`

## Kaynak kod

```javascript
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
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
