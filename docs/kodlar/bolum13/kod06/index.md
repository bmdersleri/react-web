---
code_id: "react_ch13_code06"
language: "javascript"
test_status: "passed"
title: "react_ch13_code06"
parent: "Bölüm 13: REST API"
grand_parent: "Kod Örnekleri"
---

# chapter_13_react_ch13_code06_post_note_request.js

**Kod kimliği:** `react_ch13_code06`  
**Bölüm kimliği:** `chapter_13`  
**Dosya:** `chapter_13_react_ch13_code06_post_note_request.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum13/kod06/chapter_13_react_ch13_code06_post_note_request.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum13/kod06
- Repository yolu: `kodlar/bolum13/kod06/chapter_13_react_ch13_code06_post_note_request.js`

## Kaynak kod

```javascript
function createNotePayload(formValues) {
  return {
    title: formValues.title.trim(),
    course: formValues.course.trim(),
    description: formValues.description.trim(),
    tags: formValues.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
  };
}

function isValidNotePayload(payload) {
  return payload.title.length >= 3 && payload.course.length >= 2 && payload.description.length >= 10;
}

function createPostRequest(endpoint, payload) {
  return {
    url: endpoint,
    options: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  };
}

const payload = createNotePayload({
  title: " React API Notları ",
  course: " React ",
  description: "REST API entegrasyonu için özet not.",
  tags: "api, fetch, react",
});

const request = createPostRequest("/api/notes", payload);
const body = JSON.parse(request.options.body);
console.log(`${request.options.method} ${request.url} | bodyTitle: ${body.title} | valid: ${isValidNotePayload(payload)}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
