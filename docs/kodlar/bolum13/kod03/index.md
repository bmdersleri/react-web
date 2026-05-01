---
title: "chapter_13_react_ch13_code03_http_status_guard.js"
code_id: "react_ch13_code03"
language: "javascript"
test_status: "passed"
---

# chapter_13_react_ch13_code03_http_status_guard.js

**Kod kimliği:** `react_ch13_code03`  
**Bölüm kimliği:** `chapter_13`  
**Dosya:** `chapter_13_react_ch13_code03_http_status_guard.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum13/kod03/chapter_13_react_ch13_code03_http_status_guard.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum13/kod03
- Repository yolu: `kodlar/bolum13/kod03/chapter_13_react_ch13_code03_http_status_guard.js`

## Kaynak kod

```javascript
function getApiErrorMessage(status, resourceName) {
  if (status === 400) return `${resourceName} isteği geçersiz görünüyor.`;
  if (status === 401) return "Bu işlem için oturum açmanız gerekiyor.";
  if (status === 403) return "Bu işlem için yetkiniz bulunmuyor.";
  if (status === 404) return `Aradığınız ${resourceName.toLowerCase()} bulunamadı.`;
  if (status >= 500) return "Sunucu tarafında geçici bir sorun oluştu.";
  return "Beklenmeyen bir API hatası oluştu.";
}

const status = 404;
const message = getApiErrorMessage(status, "Duyuru");
console.log(`${status}: ${message}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
