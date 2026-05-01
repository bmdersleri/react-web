---
title: "chapter_14_react_ch14_code03_announcement_selector.js"
code_id: "react_ch14_code03"
language: "javascript"
test_status: "passed"
---

# chapter_14_react_ch14_code03_announcement_selector.js

**Kod kimliği:** `react_ch14_code03`  
**Bölüm kimliği:** `chapter_14`  
**Dosya:** `chapter_14_react_ch14_code03_announcement_selector.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum14/kod03/chapter_14_react_ch14_code03_announcement_selector.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum14/kod03
- Repository yolu: `kodlar/bolum14/kod03/chapter_14_react_ch14_code03_announcement_selector.js`

## Kaynak kod

```javascript
const announcements = [
  { id: "a1", title: "Vize takvimi", category: "academic", pinned: true },
  { id: "a2", title: "Kariyer günü", category: "career", pinned: false },
  { id: "a3", title: "Kulüp buluşması", category: "social", pinned: true },
];

const store = {
  announcementFilter: {
    category: "academic",
    onlyPinned: true,
  },
};

function selectVisibleAnnouncements(state, list) {
  const { category, onlyPinned } = state.announcementFilter;
  return list.filter((item) => {
    const categoryMatch = category === "all" || item.category === category;
    const pinnedMatch = !onlyPinned || item.pinned;
    return categoryMatch && pinnedMatch;
  });
}

const visible = selectVisibleAnnouncements(store, announcements);
console.log(`filtered=${visible.length} | first=${visible[0].title}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
