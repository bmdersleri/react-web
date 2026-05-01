---
code_id: "react_ch02_code05"
language: "javascript"
test_status: "passed"
title: "js_async_await_mock_announcements"
parent: "Bölüm 2: JavaScript ES6+ ve React"
grand_parent: "Kod Örnekleri"
---

# js_async_await_mock_announcements

**Kod kimliği:** `react_ch02_code05`  
**Bölüm kimliği:** `chapter_02`  
**Dosya:** `kampushub_async_announcements.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum02/kod05/kampushub_async_announcements.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum02/kod05
- Repository yolu: `kodlar/bolum02/kod05/kampushub_async_announcements.js`

## Kaynak kod

```javascript
function fetchAnnouncementsMock() {
  return Promise.resolve([
    { id: 1, title: "ES6+ çalışma notları yayınlandı" },
    { id: 2, title: "KampüsHub veri modeli hazırlanacak" }
  ]);
}

async function printAnnouncementCount() {
  const announcements = await fetchAnnouncementsMock();
  console.log(`Yüklenen duyuru sayısı: ${announcements.length}`);
}

printAnnouncementCount();
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
