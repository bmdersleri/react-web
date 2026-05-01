---
title: "ref_box_without_render"
code_id: "react_ch08_code01"
language: "javascript"
test_status: "passed"
---

# ref_box_without_render

**Kod kimliği:** `react_ch08_code01`  
**Bölüm kimliği:** `chapter_08`  
**Dosya:** `ref_box_without_render.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum08/kod01/ref_box_without_render.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum08/kod01
- Repository yolu: `kodlar/bolum08/kod01/ref_box_without_render.js`

## Kaynak kod

```javascript
function createRefBox(initialValue) {
  return { current: initialValue };
}

function simulateRefUpdates() {
  const counterRef = createRefBox(0);
  let renderCount = 1;

  counterRef.current += 1;
  counterRef.current += 1;
  counterRef.current += 1;

  return {
    current: counterRef.current,
    renderCount
  };
}

const result = simulateRefUpdates();
console.log(`current:${result.current}`);
console.log(`renders:${result.renderCount}`);
console.log("ref-ok");
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
