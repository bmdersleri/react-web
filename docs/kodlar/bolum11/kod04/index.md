---
code_id: "react_ch11_code02"
language: "javascript"
test_status: "passed"
title: "react_ch11_code02"
parent: "Bölüm 11: Form Yönetimi"
grand_parent: "Kod Örnekleri"
---

# chapter_11_react_ch11_code02_validate_profile.js

**Kod kimliği:** `react_ch11_code02`  
**Bölüm kimliği:** `chapter_11`  
**Dosya:** `chapter_11_react_ch11_code02_validate_profile.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum11/kod04/chapter_11_react_ch11_code02_validate_profile.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum11/kod04
- Repository yolu: `kodlar/bolum11/kod04/chapter_11_react_ch11_code02_validate_profile.js`

## Kaynak kod

```javascript
function validateProfileForm(values) {
  const errors = {};

  if (!values.fullName || values.fullName.trim().length < 2) {
    errors.fullName = "Ad soyad en az iki karakter olmalıdır.";
  }

  const email = values.email || "";
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.trim())) {
    errors.email = "Geçerli bir e-posta adresi giriniz.";
  }

  if (!values.department || values.department.trim() === "") {
    errors.department = "Bölüm bilgisi seçilmelidir.";
  }

  return errors;
}

const errors = validateProfileForm({
  fullName: " ",
  email: "ogrenci-at-kampus",
  department: "Bilgisayar Mühendisliği"
});

console.log(Object.keys(errors).sort().join(", "));
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
