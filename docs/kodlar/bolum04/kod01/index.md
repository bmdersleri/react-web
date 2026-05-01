---
title: "jsx_expression_model"
code_id: "react_ch04_code01"
language: "javascript"
test_status: "passed"
---

# jsx_expression_model

**Kod kimliği:** `react_ch04_code01`  
**Bölüm kimliği:** `chapter_04`  
**Dosya:** `jsx_expression_model.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum04/kod01/jsx_expression_model.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum04/kod01
- Repository yolu: `kodlar/bolum04/kod01/jsx_expression_model.js`

## Kaynak kod

```javascript
const appName = "KampüsHub";
const activeModule = "Duyurular";

function renderTitle(name, moduleName) {
  return `${name} | Aktif modül: ${moduleName}`;
}

console.log(renderTitle(appName, activeModule));
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
