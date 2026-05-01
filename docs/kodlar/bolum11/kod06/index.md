---
code_id: "react_ch11_code04"
language: "javascript"
test_status: "passed"
title: "react_ch11_code04"
parent: "Bölüm 11: Form Yönetimi"
grand_parent: "Kod Örnekleri"
---

# chapter_11_react_ch11_code04_dirty_fields.js

**Kod kimliği:** `react_ch11_code04`  
**Bölüm kimliği:** `chapter_11`  
**Dosya:** `chapter_11_react_ch11_code04_dirty_fields.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum11/kod06/chapter_11_react_ch11_code04_dirty_fields.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum11/kod06
- Repository yolu: `kodlar/bolum11/kod06/chapter_11_react_ch11_code04_dirty_fields.js`

## Kaynak kod

```javascript
function getDirtyFields(initialValues, currentValues) {
  return Object.keys(currentValues)
    .filter((fieldName) => currentValues[fieldName] !== initialValues[fieldName])
    .sort();
}

const initialProfile = {
  fullName: "Mehmet Demir",
  email: "mehmet@kampus.edu.tr",
  bio: "",
  wantsNotifications: true
};

const currentProfile = {
  fullName: "Mehmet Demir",
  email: "m.demir@kampus.edu.tr",
  bio: "React öğreniyorum.",
  wantsNotifications: true
};

console.log(getDirtyFields(initialProfile, currentProfile).join(", "));
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
