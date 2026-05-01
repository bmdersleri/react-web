---
title: "chapter_11_react_ch11_code03_update_field.js"
code_id: "react_ch11_code03"
language: "javascript"
test_status: "passed"
---

# chapter_11_react_ch11_code03_update_field.js

**Kod kimliği:** `react_ch11_code03`  
**Bölüm kimliği:** `chapter_11`  
**Dosya:** `chapter_11_react_ch11_code03_update_field.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum11/kod02/chapter_11_react_ch11_code03_update_field.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum11/kod02
- Repository yolu: `kodlar/bolum11/kod02/chapter_11_react_ch11_code03_update_field.js`

## Kaynak kod

```javascript
function updateFormField(formState, fieldName, fieldValue) {
  return {
    ...formState,
    [fieldName]: fieldValue
  };
}

const originalForm = {
  title: "",
  course: "Web Programlama",
  visibility: "campus"
};

const nextForm = updateFormField(originalForm, "title", "React Notları");

console.log(`${nextForm.title} / original:${originalForm.title}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
