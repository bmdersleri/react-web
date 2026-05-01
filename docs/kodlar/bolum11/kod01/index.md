---
title: "chapter_11_react_ch11_code01_normalize_profile.js"
code_id: "react_ch11_code01"
language: "javascript"
test_status: "passed"
---

# chapter_11_react_ch11_code01_normalize_profile.js

**Kod kimliği:** `react_ch11_code01`  
**Bölüm kimliği:** `chapter_11`  
**Dosya:** `chapter_11_react_ch11_code01_normalize_profile.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum11/kod01/chapter_11_react_ch11_code01_normalize_profile.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum11/kod01
- Repository yolu: `kodlar/bolum11/kod01/chapter_11_react_ch11_code01_normalize_profile.js`

## Kaynak kod

```javascript
function normalizeProfileForm(values) {
  return {
    fullName: values.fullName.trim().replace(/\s+/g, " "),
    email: values.email.trim().toLowerCase(),
    department: values.department.trim(),
    classYear: String(values.classYear).trim(),
    wantsNotifications: Boolean(values.wantsNotifications)
  };
}

const normalized = normalizeProfileForm({
  fullName: "  Ayşe   Yılmaz  ",
  email: " AYSE@KAMPUS.EDU.TR ",
  department: "Bilgisayar Mühendisliği",
  classYear: " 2 ",
  wantsNotifications: true
});

console.log(`${normalized.fullName} | ${normalized.email} | ${normalized.classYear}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
