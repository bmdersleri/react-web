---
title: "module_card_class_name_builder"
code_id: "react_ch03_code04"
language: "javascript"
test_status: "passed"
---

# module_card_class_name_builder

**Kod kimliği:** `react_ch03_code04`  
**Bölüm kimliği:** `chapter_03`  
**Dosya:** `module_card_class_name_builder.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum03/kod04/module_card_class_name_builder.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum03/kod04
- Repository yolu: `kodlar/bolum03/kod04/module_card_class_name_builder.js`

## Kaynak kod

```javascript
function createModuleCardClassName(isActive) {
  const baseClass = "module-card";
  return isActive ? `${baseClass} ${baseClass}--active` : baseClass;
}

console.log(createModuleCardClassName(true));
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
