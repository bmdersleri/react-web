---
code_id: "react_ch16_code06"
language: "javascript"
test_status: "passed"
title: "react_ch16_code06"
parent: "Bölüm 16: KampüsHub Final"
grand_parent: "Kod Örnekleri"
---

# chapter_16_react_ch16_code06_release_gate.js

**Kod kimliği:** `react_ch16_code06`  
**Bölüm kimliği:** `chapter_16`  
**Dosya:** `chapter_16_react_ch16_code06_release_gate.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum16/kod06/chapter_16_react_ch16_code06_release_gate.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum16/kod06
- Repository yolu: `kodlar/bolum16/kod06/chapter_16_react_ch16_code06_release_gate.js`

## Kaynak kod

```javascript
const gates = [
  { name: "routes", passed: true },
  { name: "forms", passed: true },
  { name: "api-states", passed: true },
  { name: "unit-tests", passed: true },
  { name: "accessibility", passed: false },
  { name: "build", passed: true },
  { name: "smoke-test", passed: false },
];

const failed = gates.filter((gate) => !gate.passed).map((gate) => gate.name);
const releaseStatus = failed.length === 0 ? "ready" : "blocked";

console.log(`release=${releaseStatus} | failed=${failed.join(",") || "none"}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
