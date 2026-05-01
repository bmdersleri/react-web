---
title: "immutable_favorite_event_update"
code_id: "react_ch06_code04"
language: "javascript"
test_status: "passed"
---

# immutable_favorite_event_update

**Kod kimliği:** `react_ch06_code04`  
**Bölüm kimliği:** `chapter_06`  
**Dosya:** `immutable_favorite_event_update.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum06/kod04/immutable_favorite_event_update.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum06/kod04
- Repository yolu: `kodlar/bolum06/kod04/immutable_favorite_event_update.js`

## Kaynak kod

```javascript
function toggleFavoriteEvent(events, selectedEventId) {
  return events.map((event) => {
    if (event.id !== selectedEventId) {
      return event;
    }

    return {
      ...event,
      isFavorite: !event.isFavorite
    };
  });
}

const events = [
  { id: "spring", title: "Bahar Şenliği", isFavorite: false },
  { id: "career", title: "Kariyer Günü", isFavorite: false }
];

const updatedEvents = toggleFavoriteEvent(events, "spring");

for (const event of updatedEvents) {
  const label = event.isFavorite ? "favorite" : "normal";
  console.log(`${event.title}: ${label}`);
}

console.log(`same array: ${events === updatedEvents}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
