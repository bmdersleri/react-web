---
code_id: "react_ch12_code04"
language: "javascript"
test_status: "passed"
title: "react_ch12_code04"
parent: "Bölüm 12: Redux Toolkit"
grand_parent: "Kod Örnekleri"
---

# chapter_12_react_ch12_code04_selectors.js

**Kod kimliği:** `react_ch12_code04`  
**Bölüm kimliği:** `chapter_12`  
**Dosya:** `chapter_12_react_ch12_code04_selectors.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum12/kod04/chapter_12_react_ch12_code04_selectors.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum12/kod04
- Repository yolu: `kodlar/bolum12/kod04/chapter_12_react_ch12_code04_selectors.js`

## Kaynak kod

```javascript
const state = {
  announcements: {
    items: [
      { id: "a1", title: "Vize takvimi yayımlandı" },
      { id: "a2", title: "Kariyer günü başvuruları" },
      { id: "a3", title: "Kütüphane çalışma saatleri" },
    ],
    readIds: ["a1"],
    pinnedIds: ["a3"],
  },
};

function selectPinnedUnreadAnnouncements(appState) {
  const { items, readIds, pinnedIds } = appState.announcements;
  return items.filter(
    (item) => pinnedIds.includes(item.id) && !readIds.includes(item.id)
  );
}

const result = selectPinnedUnreadAnnouncements(state)
  .map((item) => `${item.id}:${item.title}`)
  .join(", ");

console.log(result);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
