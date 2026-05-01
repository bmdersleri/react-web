---
title: "chapter_12_react_ch12_code05_prepare_payload.js"
code_id: "react_ch12_code05"
language: "javascript"
test_status: "passed"
---

# chapter_12_react_ch12_code05_prepare_payload.js

**Kod kimliği:** `react_ch12_code05`  
**Bölüm kimliği:** `chapter_12`  
**Dosya:** `chapter_12_react_ch12_code05_prepare_payload.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum12/kod05/chapter_12_react_ch12_code05_prepare_payload.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum12/kod05
- Repository yolu: `kodlar/bolum12/kod05/chapter_12_react_ch12_code05_prepare_payload.js`

## Kaynak kod

```javascript
function prepareAddNoteAction(formValues) {
  const tags = formValues.tags
    .split(",")
    .map((tag) => tag.trim().toLowerCase())
    .filter(Boolean);

  return {
    type: "notes/addNote",
    payload: {
      title: formValues.title.trim(),
      course: formValues.course.trim(),
      tags,
    },
  };
}

const action = prepareAddNoteAction({
  title: "  Redux Toolkit ",
  course: " React ",
  tags: "Redux, State,  ",
});

console.log(JSON.stringify(action));
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
