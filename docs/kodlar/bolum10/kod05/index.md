---
code_id: "react_ch10_code04"
language: "javascript"
test_status: "passed"
title: "react_ch10_code04"
parent: "Bölüm 10: React Router"
grand_parent: "Kod Örnekleri"
---

# react_ch10_code04_not_found_match.js

**Kod kimliği:** `react_ch10_code04`  
**Bölüm kimliği:** `chapter_10`  
**Dosya:** `react_ch10_code04_not_found_match.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum10/kod05/react_ch10_code04_not_found_match.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum10/kod05
- Repository yolu: `kodlar/bolum10/kod05/react_ch10_code04_not_found_match.js`

## Kaynak kod

```javascript
const routeTable = new Map([
  ["/", "HomePage"],
  ["/announcements", "AnnouncementsPage"],
  ["/events", "EventsPage"],
  ["/notes", "NotesPage"],
  ["/profile", "ProfilePage"]
]);

function resolvePage(path) {
  if (/^\/announcements\/[^/]+$/.test(path)) {
    return "AnnouncementDetailPage";
  }
  return routeTable.get(path) ?? "NotFoundPage";
}

console.log(`known=${resolvePage("/events")};unknown=${resolvePage("/clubs")}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
