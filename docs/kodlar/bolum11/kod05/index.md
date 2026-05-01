---
title: "chapter_11_react_ch11_code06_field_feedback.js"
code_id: "react_ch11_code06"
language: "javascript"
test_status: "passed"
---

# chapter_11_react_ch11_code06_field_feedback.js

**Kod kimliği:** `react_ch11_code06`  
**Bölüm kimliği:** `chapter_11`  
**Dosya:** `chapter_11_react_ch11_code06_field_feedback.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum11/kod05/chapter_11_react_ch11_code06_field_feedback.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum11/kod05
- Repository yolu: `kodlar/bolum11/kod05/chapter_11_react_ch11_code06_field_feedback.js`

## Kaynak kod

```javascript
function getFieldFeedback(fieldName, errors, touched, submitted) {
  const shouldShowError = Boolean(errors[fieldName]) && (touched[fieldName] || submitted);

  if (!shouldShowError) {
    return {
      field: fieldName,
      status: "idle",
      message: ""
    };
  }

  return {
    field: fieldName,
    status: "error",
    message: errors[fieldName]
  };
}

const errors = {
  email: "Geçerli e-posta giriniz.",
  title: "Başlık zorunludur."
};

const touched = {
  email: true,
  title: false
};

const emailFeedback = getFieldFeedback("email", errors, touched, false);
const titleFeedback = getFieldFeedback("title", errors, touched, false);

console.log(
  `email:${emailFeedback.status}:${emailFeedback.message} | title:${titleFeedback.status}`
);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
