---
title: "react_ch10_code01_routes.js"
code_id: "react_ch10_code01"
language: "javascript"
test_status: "passed"
---

# react_ch10_code01_routes.js

**Kod kimliği:** `react_ch10_code01`  
**Bölüm kimliği:** `chapter_10`  
**Dosya:** `react_ch10_code01_routes.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum10/kod01/react_ch10_code01_routes.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum10/kod01
- Repository yolu: `kodlar/bolum10/kod01/react_ch10_code01_routes.js`

## Kaynak kod

```javascript
const campusRoutes = [
  { path: "/", label: "Ana Sayfa", page: "HomePage" },
  { path: "/announcements", label: "Duyurular", page: "AnnouncementsPage" },
  { path: "/announcements/:announcementId", label: "Duyuru Detayı", page: "AnnouncementDetailPage" },
  { path: "/events", label: "Etkinlikler", page: "EventsPage" },
  { path: "/notes", label: "Not Paylaşımı", page: "NotesPage" },
  { path: "/profile", label: "Profil", page: "ProfilePage" }
];

const detailRoute = campusRoutes.find((route) => route.path.includes(":"));
const hasProfile = campusRoutes.some((route) => route.path === "/profile");

console.log(`routeCount=${campusRoutes.length};detailRoute=${detailRoute.path};hasProfile=${hasProfile}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
