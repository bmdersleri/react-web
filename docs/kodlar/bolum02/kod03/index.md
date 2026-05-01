---
code_id: "react_ch02_code03"
language: "javascript"
test_status: "passed"
title: "js_array_methods_module_cards"
parent: "Bölüm 2: JavaScript ES6+ ve React"
grand_parent: "Kod Örnekleri"
---

# js_array_methods_module_cards

**Kod kimliği:** `react_ch02_code03`  
**Bölüm kimliği:** `chapter_02`  
**Dosya:** `kampushub_module_cards.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum02/kod03/kampushub_module_cards.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum02/kod03
- Repository yolu: `kodlar/bolum02/kod03/kampushub_module_cards.js`

## Kaynak kod

```javascript
const modules = [
  { id: "announcements", title: "Duyurular", isActive: true, unreadCount: 3 },
  { id: "events", title: "Etkinlikler", isActive: true, unreadCount: 1 },
  { id: "notes", title: "Not Paylaşımı", isActive: false, unreadCount: 0 },
  { id: "profile", title: "Profil", isActive: true, unreadCount: 0 }
];

const activeModuleTitles = modules
  .filter((module) => module.isActive)
  .map((module) => module.title);

console.log(`Aktif modüller: ${activeModuleTitles.join(", ")}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
