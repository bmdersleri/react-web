---
code_id: "react_ch12_code06"
language: "javascript"
test_status: "passed"
title: "react_ch12_code06"
parent: "Bölüm 12: Redux Toolkit"
grand_parent: "Kod Örnekleri"
---

# chapter_12_react_ch12_code06_state_snapshot.js

**Kod kimliği:** `react_ch12_code06`  
**Bölüm kimliği:** `chapter_12`  
**Dosya:** `chapter_12_react_ch12_code06_state_snapshot.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum12/kod06/chapter_12_react_ch12_code06_state_snapshot.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum12/kod06
- Repository yolu: `kodlar/bolum12/kod06/chapter_12_react_ch12_code06_state_snapshot.js`

## Kaynak kod

```javascript
const appState = {
  preferences: {
    theme: "dark",
    notificationsEnabled: true,
    compactMode: false,
  },
  announcements: {
    items: [
      { id: "a1", title: "Vize takvimi" },
      { id: "a2", title: "Seminer duyurusu" },
    ],
    readIds: ["a1"],
    pinnedIds: [],
  },
  notes: {
    items: [{ id: "n1", title: "React Router özeti" }],
  },
};

function summarizeState(state) {
  return [
    `announcements: ${state.announcements.items.length}`,
    `theme: ${state.preferences.theme}`,
    `notes: ${state.notes.items.length}`,
  ].join(" | ");
}

console.log(summarizeState(appState));
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
