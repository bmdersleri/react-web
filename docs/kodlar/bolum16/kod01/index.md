---
code_id: "react_ch16_code01"
language: "javascript"
test_status: "passed"
title: "react_ch16_code01"
parent: "Bölüm 16: KampüsHub Final"
grand_parent: "Kod Örnekleri"
---

# chapter_16_react_ch16_code01_module_readiness.js

**Kod kimliği:** `react_ch16_code01`  
**Bölüm kimliği:** `chapter_16`  
**Dosya:** `chapter_16_react_ch16_code01_module_readiness.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum16/kod01/chapter_16_react_ch16_code01_module_readiness.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum16/kod01
- Repository yolu: `kodlar/bolum16/kod01/chapter_16_react_ch16_code01_module_readiness.js`

## Kaynak kod

```javascript
const modules = [
  { name: "routing", ready: true },
  { name: "announcements", ready: true },
  { name: "events", ready: true },
  { name: "notes", ready: true },
  { name: "profile", ready: true },
  { name: "preferences", ready: true },
  { name: "tests", ready: true },
  { name: "accessibility", ready: false },
];

const readyCount = modules.filter((module) => module.ready).length;
const missing = modules
  .filter((module) => !module.ready)
  .map((module) => module.name)
  .join(",") || "none";

console.log(`modules=${readyCount}/${modules.length} | missing=${missing}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
