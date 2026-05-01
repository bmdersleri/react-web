---
code_id: "react_ch15_code06"
language: "javascript"
test_status: "passed"
title: "react_ch15_code06"
parent: "Bölüm 15: Performans ve Test"
grand_parent: "Kod Örnekleri"
---

# chapter_15_react_ch15_code06_release_gate.js

**Kod kimliği:** `react_ch15_code06`  
**Bölüm kimliği:** `chapter_15`  
**Dosya:** `chapter_15_react_ch15_code06_release_gate.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum15/kod06/chapter_15_react_ch15_code06_release_gate.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum15/kod06
- Repository yolu: `kodlar/bolum15/kod06/chapter_15_react_ch15_code06_release_gate.js`

## Kaynak kod

```javascript
const checks = [
  { name: "tests", passed: true },
  { name: "build", passed: true },
  { name: "accessibility", passed: false },
  { name: "routing", passed: true },
  { name: "env", passed: false }
];

function summarizeReleaseGate(items) {
  const failed = items.filter((item) => !item.passed).map((item) => item.name);
  return {
    release: failed.length === 0 ? "ready" : "blocked",
    failed
  };
}

const summary = summarizeReleaseGate(checks);
console.log(`release=${summary.release} | failed=${summary.failed.join(",") || "none"}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
