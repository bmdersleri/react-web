---
code_id: "react_ch04_code03"
language: "javascript"
test_status: "passed"
title: "module_card_summary"
parent: "Bölüm 4: JSX ve Bileşen Anatomisi"
grand_parent: "Kod Örnekleri"
---

# module_card_summary

**Kod kimliği:** `react_ch04_code03`  
**Bölüm kimliği:** `chapter_04`  
**Dosya:** `module_card_summary.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum04/kod03/module_card_summary.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum04/kod03
- Repository yolu: `kodlar/bolum04/kod03/module_card_summary.js`

## Kaynak kod

```javascript
const modules = [
  { title: "Duyurular", newItems: 4 },
  { title: "Etkinlikler", newItems: 2 },
  { title: "Not Paylaşımı", newItems: 7 },
  { title: "Profil", newItems: 1 },
];

const summaries = modules.map((moduleItem) => {
  return `${moduleItem.title}: ${moduleItem.newItems} yeni kayıt`;
});

console.log(summaries.join("\n"));
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
