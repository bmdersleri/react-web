---
code_id: "react_ch06_code03"
language: "javascript"
test_status: "passed"
title: "functional_update_unread_count"
parent: "Bölüm 6: State Yönetimi"
grand_parent: "Kod Örnekleri"
---

# functional_update_unread_count

**Kod kimliği:** `react_ch06_code03`  
**Bölüm kimliği:** `chapter_06`  
**Dosya:** `functional_update_unread_count.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum06/kod03/functional_update_unread_count.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum06/kod03
- Repository yolu: `kodlar/bolum06/kod03/functional_update_unread_count.js`

## Kaynak kod

```javascript
function markOneAnnouncementAsRead(previousCount) {
  return Math.max(previousCount - 1, 0);
}

let unreadCount = 2;
console.log(`start: ${unreadCount}`);

unreadCount = markOneAnnouncementAsRead(unreadCount);
console.log(`after first: ${unreadCount}`);

unreadCount = markOneAnnouncementAsRead(unreadCount);
console.log(`after second: ${unreadCount}`);

unreadCount = markOneAnnouncementAsRead(unreadCount);
console.log(`after third: ${unreadCount}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
