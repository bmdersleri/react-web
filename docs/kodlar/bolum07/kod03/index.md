---
title: "fake_announcements_loader"
code_id: "react_ch07_code03"
language: "javascript"
test_status: "passed"
---

# fake_announcements_loader

**Kod kimliği:** `react_ch07_code03`  
**Bölüm kimliği:** `chapter_07`  
**Dosya:** `fake_announcements_loader.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum07/kod03/fake_announcements_loader.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum07/kod03
- Repository yolu: `kodlar/bolum07/kod03/fake_announcements_loader.js`

## Kaynak kod

```javascript
function fetchAnnouncementsMock() {
  const announcements = [
    { id: 1, title: "Vize takvimi güncellendi" },
    { id: 2, title: "React laboratuvarı Cuma günü" },
    { id: 3, title: "Kampüs etkinliği başvuruları açıldı" }
  ];

  return Promise.resolve(announcements);
}

async function loadAnnouncements() {
  console.log("Yükleme başladı");
  const result = await fetchAnnouncementsMock();
  console.log(`Duyuru sayısı: ${result.length}`);
  console.log("Yükleme tamamlandı");
}

loadAnnouncements();
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
