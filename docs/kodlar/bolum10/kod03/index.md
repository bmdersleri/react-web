---
title: "react_ch10_code03_dynamic_param.js"
code_id: "react_ch10_code03"
language: "javascript"
test_status: "passed"
---

# react_ch10_code03_dynamic_param.js

**Kod kimliği:** `react_ch10_code03`  
**Bölüm kimliği:** `chapter_10`  
**Dosya:** `react_ch10_code03_dynamic_param.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum10/kod03/react_ch10_code03_dynamic_param.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum10/kod03
- Repository yolu: `kodlar/bolum10/kod03/react_ch10_code03_dynamic_param.js`

## Kaynak kod

```javascript
function extractAnnouncementId(path) {
  const match = path.match(/^\/announcements\/([^/]+)$/);
  if (!match) {
    return { matched: false, announcementId: null };
  }
  return { matched: true, announcementId: decodeURIComponent(match[1]) };
}

const result = extractAnnouncementId("/announcements/42");
console.log(`matched=${result.matched};announcementId=${result.announcementId}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
