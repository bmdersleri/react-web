---
title: "js_immutable_announcement_update"
code_id: "react_ch02_code04"
language: "javascript"
test_status: "passed"
---

# js_immutable_announcement_update

**Kod kimliği:** `react_ch02_code04`  
**Bölüm kimliği:** `chapter_02`  
**Dosya:** `kampushub_immutable_update.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum02/kod04/kampushub_immutable_update.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum02/kod04
- Repository yolu: `kodlar/bolum02/kod04/kampushub_immutable_update.js`

## Kaynak kod

```javascript
const announcement = {
  id: 7,
  title: "Laboratuvar saati duyurusu",
  courseCode: "BMU204",
  isPinned: false
};

function updateAnnouncementTitle(item, newTitle) {
  return {
    ...item,
    title: newTitle
  };
}

const updatedAnnouncement = updateAnnouncementTitle(
  announcement,
  "Laboratuvar saati değişti"
);

console.log(`Eski başlık: ${announcement.title}`);
console.log(`Güncel başlık: ${updatedAnnouncement.title}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
