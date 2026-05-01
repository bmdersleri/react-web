---
title: "chapter_16_react_ch16_code02_route_coverage.js"
code_id: "react_ch16_code02"
language: "javascript"
test_status: "passed"
---

# chapter_16_react_ch16_code02_route_coverage.js

**Kod kimliği:** `react_ch16_code02`  
**Bölüm kimliği:** `chapter_16`  
**Dosya:** `chapter_16_react_ch16_code02_route_coverage.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum16/kod02/chapter_16_react_ch16_code02_route_coverage.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum16/kod02
- Repository yolu: `kodlar/bolum16/kod02/chapter_16_react_ch16_code02_route_coverage.js`

## Kaynak kod

```javascript
const requiredRoutes = [
  "/",
  "/announcements",
  "/announcements/:announcementId",
  "/events",
  "/notes",
  "/profile",
  "/settings",
];

const configuredRoutes = [
  "/",
  "/announcements",
  "/announcements/:announcementId",
  "/events",
  "/notes",
  "/profile",
  "/settings",
  "*",
];

const missingRoutes = requiredRoutes.filter(
  (route) => !configuredRoutes.includes(route),
);

console.log(
  `routes=${requiredRoutes.length - missingRoutes.length}/${requiredRoutes.length} | missing=${missingRoutes.join(",") || "none"}`,
);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
