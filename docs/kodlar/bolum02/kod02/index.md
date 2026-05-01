---
code_id: "react_ch02_code02"
language: "javascript"
test_status: "passed"
title: "js_destructuring_profile_summary"
parent: "Bölüm 2: JavaScript ES6+ ve React"
grand_parent: "Kod Örnekleri"
---

# js_destructuring_profile_summary

**Kod kimliği:** `react_ch02_code02`  
**Bölüm kimliği:** `chapter_02`  
**Dosya:** `kampushub_profile_summary.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum02/kod02/kampushub_profile_summary.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum02/kod02
- Repository yolu: `kodlar/bolum02/kod02/kampushub_profile_summary.js`

## Kaynak kod

```javascript
const studentProfile = {
  fullName: "Elif",
  department: "Bilgisayar Mühendisliği",
  year: 2,
  role: "student"
};

function createProfileSummary(profile) {
  const { fullName, department, year } = profile;
  return `${fullName} | ${department} | ${year}. sınıf`;
}

console.log(createProfileSummary(studentProfile));
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
