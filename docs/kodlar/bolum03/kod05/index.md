---
title: "accessibility_warning_counter"
code_id: "react_ch03_code05"
language: "javascript"
test_status: "passed"
---

# accessibility_warning_counter

**Kod kimliği:** `react_ch03_code05`  
**Bölüm kimliği:** `chapter_03`  
**Dosya:** `accessibility_warning_counter.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum03/kod05/accessibility_warning_counter.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum03/kod05
- Repository yolu: `kodlar/bolum03/kod05/accessibility_warning_counter.js`

## Kaynak kod

```javascript
const accessibilityChecks = [
  { name: "Başlık hiyerarşisi", passed: true },
  { name: "Bağlantı metinleri açıklayıcı", passed: false },
  { name: "Form etiketleri", passed: true },
  { name: "Görsel alternatif metinleri", passed: false }
];

function countMissingAccessibilityItems(checks) {
  return checks.filter((check) => !check.passed).length;
}

console.log(`Eksik erişilebilirlik uyarısı: ${countMissingAccessibilityItems(accessibilityChecks)}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
