---
code_id: "react_ch14_code01"
language: "javascript"
test_status: "passed"
title: "react_ch14_code01"
parent: "Bölüm 14: Zustand"
grand_parent: "Kod Örnekleri"
---

# chapter_14_react_ch14_code01_create_preference_store.js

**Kod kimliği:** `react_ch14_code01`  
**Bölüm kimliği:** `chapter_14`  
**Dosya:** `chapter_14_react_ch14_code01_create_preference_store.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum14/kod01/chapter_14_react_ch14_code01_create_preference_store.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum14/kod01
- Repository yolu: `kodlar/bolum14/kod01/chapter_14_react_ch14_code01_create_preference_store.js`

## Kaynak kod

```javascript
function createInitialPreferenceStore() {
  return {
    preferences: {
      theme: "light",
      notificationsEnabled: true,
      compactMode: false,
    },
    announcementFilter: {
      category: "all",
      onlyPinned: false,
    },
    ui: {
      sidebarOpen: false,
      activePanel: "home",
    },
  };
}

const store = createInitialPreferenceStore();
console.log(
  `theme=${store.preferences.theme} | ` +
    `notifications=${store.preferences.notificationsEnabled} | ` +
    `category=${store.announcementFilter.category}`
);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
