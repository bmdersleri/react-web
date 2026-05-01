---
title: "fake_storage_preferences"
code_id: "react_ch07_code06"
language: "javascript"
test_status: "passed"
---

# fake_storage_preferences

**Kod kimliği:** `react_ch07_code06`  
**Bölüm kimliği:** `chapter_07`  
**Dosya:** `fake_storage_preferences.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum07/kod06/fake_storage_preferences.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum07/kod06
- Repository yolu: `kodlar/bolum07/kod06/fake_storage_preferences.js`

## Kaynak kod

```javascript
function createMemoryStorage() {
  const data = new Map();

  return {
    setItem(key, value) {
      data.set(key, String(value));
    },
    getItem(key) {
      return data.has(key) ? data.get(key) : null;
    }
  };
}

const storage = createMemoryStorage();

function savePreference(key, value) {
  storage.setItem(`kampushub:${key}`, value);
}

function readPreference(key, fallbackValue) {
  return storage.getItem(`kampushub:${key}`) ?? fallbackValue;
}

savePreference("theme", "dark");
savePreference("selectedModule", "events");

console.log(`theme:${readPreference("theme", "light")}`);
console.log(`selectedModule:${readPreference("selectedModule", "announcements")}`);
console.log(readPreference("theme", "light") === "dark" ? "storage-ok" : "storage-failed");
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
