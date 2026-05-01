---
code_id: "react_ch09_code03"
language: "javascript"
test_status: "passed"
title: "react_ch09_code03"
parent: "Bölüm 9: Custom Hooks"
grand_parent: "Kod Örnekleri"
---

# react_ch09_code03_announcement_filter.js

**Kod kimliği:** `react_ch09_code03`  
**Bölüm kimliği:** `chapter_09`  
**Dosya:** `react_ch09_code03_announcement_filter.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum09/kod03/react_ch09_code03_announcement_filter.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum09/kod03
- Repository yolu: `kodlar/bolum09/kod03/react_ch09_code03_announcement_filter.js`

## Kaynak kod

```javascript
const announcements = [
  { id: 1, title: "Final sınav takvimi açıklandı", category: "academic" },
  { id: 2, title: "Bahar şenliği başlıyor", category: "social" },
  { id: 3, title: "Kütüphane çalışma saatleri güncellendi", category: "campus" }
];

function buildAnnouncementFilterModel(items, filter) {
  const query = filter.query.trim().toLowerCase();
  const visible = items.filter((item) => {
    const matchesQuery = item.title.toLowerCase().includes(query);
    const matchesCategory = filter.category === "all" || item.category === filter.category;
    return matchesQuery && matchesCategory;
  });

  return {
    visible,
    isEmpty: visible.length === 0,
    message: visible.length === 0 ? "Uygun duyuru bulunamadı" : `${visible.length} duyuru listeleniyor`
  };
}

const model = buildAnnouncementFilterModel(announcements, {
  query: "final",
  category: "academic"
});

console.log(`visible=${model.visible.length};empty=${model.isEmpty};message=${model.message}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
