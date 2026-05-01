---
code_id: "react_ch12_code03"
language: "javascript"
test_status: "passed"
title: "react_ch12_code03"
parent: "Bölüm 12: Redux Toolkit"
grand_parent: "Kod Örnekleri"
---

# chapter_12_react_ch12_code03_announcements_reducer.js

**Kod kimliği:** `react_ch12_code03`  
**Bölüm kimliği:** `chapter_12`  
**Dosya:** `chapter_12_react_ch12_code03_announcements_reducer.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum12/kod03/chapter_12_react_ch12_code03_announcements_reducer.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum12/kod03
- Repository yolu: `kodlar/bolum12/kod03/chapter_12_react_ch12_code03_announcements_reducer.js`

## Kaynak kod

```javascript
const initialAnnouncements = {
  items: [
    { id: "a1", title: "Vize takvimi yayımlandı" },
    { id: "a2", title: "Kariyer günü başvuruları" },
    { id: "a3", title: "Kütüphane çalışma saatleri" },
  ],
  readIds: [],
  pinnedIds: [],
};

function uniqueAdd(list, id) {
  return list.includes(id) ? list : [...list, id];
}

function announcementsReducer(state = initialAnnouncements, action) {
  switch (action.type) {
    case "announcements/markAsRead":
      return { ...state, readIds: uniqueAdd(state.readIds, action.payload) };
    case "announcements/pin":
      return { ...state, pinnedIds: uniqueAdd(state.pinnedIds, action.payload) };
    default:
      return state;
  }
}

const afterRead = announcementsReducer(initialAnnouncements, {
  type: "announcements/markAsRead",
  payload: "a1",
});

const afterPin = announcementsReducer(afterRead, {
  type: "announcements/pin",
  payload: "a3",
});

const unreadCount = afterPin.items.length - afterPin.readIds.length;
console.log(`unread: ${unreadCount} | pinned: ${afterPin.pinnedIds.length}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
