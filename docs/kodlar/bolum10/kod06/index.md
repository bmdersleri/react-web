---
title: "react_ch10_code05_page_title.js"
code_id: "react_ch10_code05"
language: "javascript"
test_status: "passed"
---

# react_ch10_code05_page_title.js

**Kod kimliği:** `react_ch10_code05`  
**Bölüm kimliği:** `chapter_10`  
**Dosya:** `react_ch10_code05_page_title.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum10/kod06/react_ch10_code05_page_title.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum10/kod06
- Repository yolu: `kodlar/bolum10/kod06/react_ch10_code05_page_title.js`

## Kaynak kod

```javascript
function getPageTitle(path) {
  const cleanPath = path.split("?")[0];
  const titles = {
    "/": "Ana Sayfa",
    "/announcements": "Duyurular",
    "/events": "Etkinlikler",
    "/notes": "Not Paylaşımı",
    "/profile": "Profil"
  };

  if (/^\/announcements\/[^/]+$/.test(cleanPath)) {
    return "Duyuru Detayı";
  }

  return titles[cleanPath] ?? "Sayfa Bulunamadı";
}

console.log(
  `notesTitle=${getPageTitle("/notes?tag=react")};detailTitle=${getPageTitle("/announcements/42")};unknownTitle=${getPageTitle("/missing")}`
);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
