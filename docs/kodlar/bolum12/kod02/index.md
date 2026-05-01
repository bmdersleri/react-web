---
code_id: "react_ch12_code02"
language: "javascript"
test_status: "passed"
title: "react_ch12_code02"
parent: "Bölüm 12: Redux Toolkit"
grand_parent: "Kod Örnekleri"
---

# chapter_12_react_ch12_code02_preferences_reducer.js

**Kod kimliği:** `react_ch12_code02`  
**Bölüm kimliği:** `chapter_12`  
**Dosya:** `chapter_12_react_ch12_code02_preferences_reducer.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum12/kod02/chapter_12_react_ch12_code02_preferences_reducer.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum12/kod02
- Repository yolu: `kodlar/bolum12/kod02/chapter_12_react_ch12_code02_preferences_reducer.js`

## Kaynak kod

```javascript
const initialPreferences = {
  theme: "light",
  notificationsEnabled: true,
  compactMode: false,
};

function preferencesReducer(state = initialPreferences, action) {
  switch (action.type) {
    case "preferences/setTheme":
      return { ...state, theme: action.payload };
    case "preferences/toggleNotifications":
      return { ...state, notificationsEnabled: !state.notificationsEnabled };
    default:
      return state;
  }
}

const afterTheme = preferencesReducer(initialPreferences, {
  type: "preferences/setTheme",
  payload: "dark",
});

const afterToggle = preferencesReducer(afterTheme, {
  type: "preferences/toggleNotifications",
});

const notificationLabel = afterToggle.notificationsEnabled ? "open" : "closed";
console.log(`${afterToggle.theme} | ${notificationLabel}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
