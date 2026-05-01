---
title: "chapter_15_react_ch15_code02_performance_budget.js"
code_id: "react_ch15_code02"
language: "javascript"
test_status: "passed"
---

# chapter_15_react_ch15_code02_performance_budget.js

**Kod kimliği:** `react_ch15_code02`  
**Bölüm kimliği:** `chapter_15`  
**Dosya:** `chapter_15_react_ch15_code02_performance_budget.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum15/kod02/chapter_15_react_ch15_code02_performance_budget.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum15/kod02
- Repository yolu: `kodlar/bolum15/kod02/chapter_15_react_ch15_code02_performance_budget.js`

## Kaynak kod

```javascript
const assets = [
  { name: "main.js", sizeKb: 310 },
  { name: "vendor.js", sizeKb: 240 },
  { name: "style.css", sizeKb: 48 }
];

function checkPerformanceBudget(files, maxKb) {
  const overBudget = files.filter((file) => file.sizeKb > maxKb).map((file) => file.name);
  return {
    status: overBudget.length === 0 ? "pass" : "warn",
    overBudget
  };
}

const result = checkPerformanceBudget(assets, 250);
console.log(`budget=${result.status} | over=${result.overBudget.join(",") || "none"}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
