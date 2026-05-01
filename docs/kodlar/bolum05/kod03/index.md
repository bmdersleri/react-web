---
title: "map_modules_to_card_summaries"
code_id: "react_ch05_code03"
language: "javascript"
test_status: "passed"
---

# map_modules_to_card_summaries

**Kod kimliği:** `react_ch05_code03`  
**Bölüm kimliği:** `chapter_05`  
**Dosya:** `map_modules_to_card_summaries.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum05/kod03/map_modules_to_card_summaries.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum05/kod03
- Repository yolu: `kodlar/bolum05/kod03/map_modules_to_card_summaries.js`

## Kaynak kod

```javascript
const modules = [
  { id: "announcements", title: "Duyurular", status: "3 yeni duyuru" },
  { id: "events", title: "Etkinlikler", status: "2 yaklaşan etkinlik" },
  { id: "notes", title: "Not Paylaşımı", status: "5 yeni not" },
  { id: "profile", title: "Profil", status: "Profil %80 tamamlandı" }
];

const summaries = modules.map((module) => `${module.title} -> ${module.status}`);

console.log(summaries.join("\n"));
console.log(`Toplam modül: ${modules.length}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
