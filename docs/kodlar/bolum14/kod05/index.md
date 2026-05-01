---
code_id: "react_ch14_code05"
language: "javascript"
test_status: "passed"
title: "react_ch14_code05"
parent: "Bölüm 14: Zustand"
grand_parent: "Kod Örnekleri"
---

# chapter_14_react_ch14_code05_persist_partial_state.js

**Kod kimliği:** `react_ch14_code05`  
**Bölüm kimliği:** `chapter_14`  
**Dosya:** `chapter_14_react_ch14_code05_persist_partial_state.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum14/kod05/chapter_14_react_ch14_code05_persist_partial_state.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum14/kod05
- Repository yolu: `kodlar/bolum14/kod05/chapter_14_react_ch14_code05_persist_partial_state.js`

## Kaynak kod

```javascript
const campusHubStore = {
  preferences: {
    theme: "dark",
    notificationsEnabled: false,
    compactMode: true,
  },
  ui: {
    sidebarOpen: true,
    activePanel: "announcements",
  },
  api: {
    loading: false,
    lastError: null,
  },
};

function selectPersistedPreferences(store) {
  return {
    theme: store.preferences.theme,
    notificationsEnabled: store.preferences.notificationsEnabled,
    compactMode: store.preferences.compactMode,
  };
}

const persisted = selectPersistedPreferences(campusHubStore);
console.log(`persisted keys: ${Object.keys(persisted).sort().join(",")}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
