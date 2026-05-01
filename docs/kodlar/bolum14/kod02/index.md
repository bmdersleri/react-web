---
code_id: "react_ch14_code02"
language: "javascript"
test_status: "passed"
title: "react_ch14_code02"
parent: "Bölüm 14: Zustand"
grand_parent: "Kod Örnekleri"
---

# chapter_14_react_ch14_code02_update_preferences.js

**Kod kimliği:** `react_ch14_code02`  
**Bölüm kimliği:** `chapter_14`  
**Dosya:** `chapter_14_react_ch14_code02_update_preferences.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum14/kod02/chapter_14_react_ch14_code02_update_preferences.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum14/kod02
- Repository yolu: `kodlar/bolum14/kod02/chapter_14_react_ch14_code02_update_preferences.js`

## Kaynak kod

```javascript
const initialStore = {
  preferences: {
    theme: "light",
    notificationsEnabled: true,
    compactMode: false,
  },
};

function updatePreferences(store, updates) {
  return {
    ...store,
    preferences: {
      ...store.preferences,
      ...updates,
    },
  };
}

const nextStore = updatePreferences(initialStore, {
  theme: "dark",
  compactMode: true,
});

console.log(
  `old=${initialStore.preferences.theme} | ` +
    `new=${nextStore.preferences.theme} | ` +
    `sameObject=${initialStore === nextStore}`
);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
