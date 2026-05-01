---
title: "chapter_16_react_ch16_code04_dashboard_sources.js"
code_id: "react_ch16_code04"
language: "javascript"
test_status: "passed"
---

# chapter_16_react_ch16_code04_dashboard_sources.js

**Kod kimliği:** `react_ch16_code04`  
**Bölüm kimliği:** `chapter_16`  
**Dosya:** `chapter_16_react_ch16_code04_dashboard_sources.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum16/kod04/chapter_16_react_ch16_code04_dashboard_sources.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum16/kod04
- Repository yolu: `kodlar/bolum16/kod04/chapter_16_react_ch16_code04_dashboard_sources.js`

## Kaynak kod

```javascript
const dashboardSources = [
  { key: "announcements", status: "success", count: 5 },
  { key: "events", status: "success", count: 2 },
  { key: "notes", status: "success", count: 8 },
  { key: "profile", status: "warning", count: 1 },
];

const cards = dashboardSources.filter((source) => source.status === "success");
const alerts = dashboardSources.filter((source) => source.status !== "success");
const dashboardStatus = cards.length >= 3 ? "ready" : "partial";

console.log(
  `dashboard=${dashboardStatus} | cards=${cards.length} | alerts=${alerts.length}`,
);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
