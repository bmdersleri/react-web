---
title: "js_template_literal_kampushub"
code_id: "react_ch02_code01"
language: "javascript"
test_status: "passed"
---

# js_template_literal_kampushub

**Kod kimliği:** `react_ch02_code01`  
**Bölüm kimliği:** `chapter_02`  
**Dosya:** `kampushub_template_literal.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum02/kod01/kampushub_template_literal.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum02/kod01
- Repository yolu: `kodlar/bolum02/kod01/kampushub_template_literal.js`

## Kaynak kod

```javascript
const appName = "KampüsHub";
const activeAnnouncementCount = 3;

function createDashboardMessage(name, count) {
  return `${name}: ${count} aktif duyuru`;
}

console.log(createDashboardMessage(appName, activeAnnouncementCount));
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
