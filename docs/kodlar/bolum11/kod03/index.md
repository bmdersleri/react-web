---
code_id: "react_ch11_code05"
language: "javascript"
test_status: "passed"
title: "react_ch11_code05"
parent: "Bölüm 11: Form Yönetimi"
grand_parent: "Kod Örnekleri"
---

# chapter_11_react_ch11_code05_note_payload.js

**Kod kimliği:** `react_ch11_code05`  
**Bölüm kimliği:** `chapter_11`  
**Dosya:** `chapter_11_react_ch11_code05_note_payload.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum11/kod03/chapter_11_react_ch11_code05_note_payload.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum11/kod03
- Repository yolu: `kodlar/bolum11/kod03/chapter_11_react_ch11_code05_note_payload.js`

## Kaynak kod

```javascript
function buildNotePayload(values) {
  const tags = values.tags
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);

  return {
    title: values.title.trim(),
    description: values.description.trim(),
    course: values.course,
    tags,
    visibility: values.visibility || "campus",
    allowComments: Boolean(values.allowComments)
  };
}

const payload = buildNotePayload({
  title: " React Hooks ",
  description: " useState ve useEffect notları ",
  course: "react",
  tags: "React, hooks,  ",
  visibility: "campus",
  allowComments: true
});

console.log(JSON.stringify({
  title: payload.title,
  tags: payload.tags,
  visibility: payload.visibility
}));
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
