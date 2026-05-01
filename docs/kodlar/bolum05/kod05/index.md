---
title: "simple_prop_contract_check"
code_id: "react_ch05_code05"
language: "javascript"
test_status: "passed"
---

# simple_prop_contract_check

**Kod kimliği:** `react_ch05_code05`  
**Bölüm kimliği:** `chapter_05`  
**Dosya:** `simple_prop_contract_check.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum05/kod05/simple_prop_contract_check.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum05/kod05
- Repository yolu: `kodlar/bolum05/kod05/simple_prop_contract_check.js`

## Kaynak kod

```javascript
function validateModuleProps(props) {
  const requiredFields = ["title", "status"];
  const missingFields = requiredFields.filter((field) => !props[field]);

  if (missingFields.length === 0) {
    return "Sözleşme geçerli";
  }

  return missingFields.map((field) => `Eksik alan: ${field}`).join("\n");
}

console.log(validateModuleProps({ title: "Duyurular", status: "3 yeni duyuru" }));
console.log(validateModuleProps({ description: "Eksik veri örneği" }));
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
