---
title: "conditional_classname"
code_id: "react_ch04_code04"
language: "javascript"
test_status: "passed"
---

# conditional_classname

**Kod kimliği:** `react_ch04_code04`  
**Bölüm kimliği:** `chapter_04`  
**Dosya:** `conditional_classname.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum04/kod04/conditional_classname.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum04/kod04
- Repository yolu: `kodlar/bolum04/kod04/conditional_classname.js`

## Kaynak kod

```javascript
function getAnnouncementClassName(isUrgent) {
  const baseClass = "announcement-card";
  return isUrgent ? `${baseClass} ${baseClass}--urgent` : baseClass;
}

console.log(getAnnouncementClassName(true));
console.log(getAnnouncementClassName(false));
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
