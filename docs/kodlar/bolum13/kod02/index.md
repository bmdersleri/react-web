---
title: "chapter_13_react_ch13_code02_response_normalizer.js"
code_id: "react_ch13_code02"
language: "javascript"
test_status: "passed"
---

# chapter_13_react_ch13_code02_response_normalizer.js

**Kod kimliği:** `react_ch13_code02`  
**Bölüm kimliği:** `chapter_13`  
**Dosya:** `chapter_13_react_ch13_code02_response_normalizer.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum13/kod02/chapter_13_react_ch13_code02_response_normalizer.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum13/kod02
- Repository yolu: `kodlar/bolum13/kod02/chapter_13_react_ch13_code02_response_normalizer.js`

## Kaynak kod

```javascript
const apiResponse = {
  data: [
    {
      announcement_id: "a1",
      heading: "Vize takvimi yayınlandı",
      description: "Bilgisayar mühendisliği vize takvimi güncellendi.",
      category: "academic",
      pinned: true,
      published_at: "2026-04-20T09:00:00Z",
    },
    {
      announcement_id: "a2",
      heading: "Kariyer günleri başlıyor",
      description: "Sektör temsilcileri öğrencilerle buluşacak.",
      category: "career",
      pinned: false,
      published_at: "2026-04-22T12:30:00Z",
    },
  ],
};

function normalizeAnnouncement(item) {
  return {
    id: item.announcement_id,
    title: item.heading,
    summary: item.description,
    category: item.category,
    isPinned: Boolean(item.pinned),
    publishedLabel: item.published_at.slice(0, 10),
  };
}

const announcements = apiResponse.data.map(normalizeAnnouncement);
console.log(
  `${announcements.length} duyuru | ilk: ${announcements[0].title} | pinned: ${announcements[0].isPinned}`
);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
