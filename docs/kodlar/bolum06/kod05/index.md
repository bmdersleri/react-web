---
code_id: "react_ch06_code05"
language: "javascript"
test_status: "passed"
title: "filter_modules_by_search_text"
parent: "Bölüm 6: State Yönetimi"
grand_parent: "Kod Örnekleri"
---

# filter_modules_by_search_text

**Kod kimliği:** `react_ch06_code05`  
**Bölüm kimliği:** `chapter_06`  
**Dosya:** `filter_modules_by_search_text.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum06/kod05/filter_modules_by_search_text.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum06/kod05
- Repository yolu: `kodlar/bolum06/kod05/filter_modules_by_search_text.js`

## Kaynak kod

```javascript
function filterModulesBySearchText(modules, searchText) {
  const normalizedSearchText = searchText.trim().toLocaleLowerCase("tr-TR");

  return modules.filter((module) => {
    const normalizedTitle = module.title.toLocaleLowerCase("tr-TR");
    return normalizedTitle.includes(normalizedSearchText);
  });
}

const modules = [
  { id: "announcements", title: "Duyurular" },
  { id: "events", title: "Etkinlikler" },
  { id: "notes", title: "Not Paylaşımı" },
  { id: "profile", title: "Profil" }
];

const query = "du";
const filteredModules = filterModulesBySearchText(modules, query);

console.log(`query: ${query}`);
console.log(filteredModules.map((module) => module.title).join(", "));
console.log(`count: ${filteredModules.length}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
