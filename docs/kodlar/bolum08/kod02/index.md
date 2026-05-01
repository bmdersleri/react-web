---
title: "context_value_snapshot"
code_id: "react_ch08_code02"
language: "javascript"
test_status: "passed"
---

# context_value_snapshot

**Kod kimliği:** `react_ch08_code02`  
**Bölüm kimliği:** `chapter_08`  
**Dosya:** `context_value_snapshot.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum08/kod02/context_value_snapshot.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum08/kod02
- Repository yolu: `kodlar/bolum08/kod02/context_value_snapshot.js`

## Kaynak kod

```javascript
function createContextSnapshot(value) {
  return {
    read(key) {
      return value[key];
    },
    keys() {
      return Object.keys(value);
    }
  };
}

const appPreferences = createContextSnapshot({
  themeName: "academic-light",
  currentUser: "demo-student",
  compactMode: false
});

console.log(`theme:${appPreferences.read("themeName")}`);
console.log(`user:${appPreferences.read("currentUser")}`);
console.log(`keys:${appPreferences.keys().join(",")}`);
console.log("context-ok");
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
