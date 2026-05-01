---
title: "react_ch09_code02_preference_store.js"
code_id: "react_ch09_code02"
language: "javascript"
test_status: "passed"
---

# react_ch09_code02_preference_store.js

**Kod kimliği:** `react_ch09_code02`  
**Bölüm kimliği:** `chapter_09`  
**Dosya:** `react_ch09_code02_preference_store.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum09/kod02/react_ch09_code02_preference_store.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum09/kod02
- Repository yolu: `kodlar/bolum09/kod02/react_ch09_code02_preference_store.js`

## Kaynak kod

```javascript
function createMemoryStorage() {
  const data = new Map();
  return {
    getItem(key) {
      return data.has(key) ? data.get(key) : null;
    },
    setItem(key, value) {
      data.set(key, String(value));
    },
    keys() {
      return Array.from(data.keys()).sort();
    }
  };
}

function createPreferenceStore(storage, namespace) {
  return {
    getPreference(name, fallbackValue) {
      const stored = storage.getItem(`${namespace}.${name}`);
      return stored === null ? fallbackValue : stored;
    },
    setPreference(name, value) {
      storage.setItem(`${namespace}.${name}`, value);
      return value;
    }
  };
}

const storage = createMemoryStorage();
const preferences = createPreferenceStore(storage, "campushub");

preferences.setPreference("theme", "dark");
preferences.setPreference("density", "compact");

console.log(
  `theme=${preferences.getPreference("theme", "light")};density=${preferences.getPreference("density", "comfortable")};keys=${storage.keys().join(",")}`
);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
