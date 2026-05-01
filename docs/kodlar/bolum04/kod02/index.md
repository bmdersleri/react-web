---
code_id: "react_ch04_code02"
language: "javascript"
test_status: "passed"
title: "component_return_model"
parent: "Bölüm 4: JSX ve Bileşen Anatomisi"
grand_parent: "Kod Örnekleri"
---

# component_return_model

**Kod kimliği:** `react_ch04_code02`  
**Bölüm kimliği:** `chapter_04`  
**Dosya:** `component_return_model.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum04/kod02/component_return_model.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum04/kod02
- Repository yolu: `kodlar/bolum04/kod02/component_return_model.js`

## Kaynak kod

```javascript
function createComponentDescription(componentName, role) {
  const startsWithUppercase = /^[A-Z]/.test(componentName);
  const namingRule = startsWithUppercase ? "PascalCase" : "küçük harfle başlamış";

  return `${componentName} bileşeni ${role}. Adlandırma: ${namingRule}`;
}

console.log(createComponentDescription("Header", "uygulama başlığını temsil eder"));
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
