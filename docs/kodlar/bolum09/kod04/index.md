---
code_id: "react_ch09_code04"
language: "javascript"
test_status: "passed"
title: "react_ch09_code04"
parent: "Bölüm 9: Custom Hooks"
grand_parent: "Kod Örnekleri"
---

# react_ch09_code04_async_resource.js

**Kod kimliği:** `react_ch09_code04`  
**Bölüm kimliği:** `chapter_09`  
**Dosya:** `react_ch09_code04_async_resource.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum09/kod04/react_ch09_code04_async_resource.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum09/kod04
- Repository yolu: `kodlar/bolum09/kod04/react_ch09_code04_async_resource.js`

## Kaynak kod

```javascript
function createAsyncResourceState() {
  return {
    status: "idle",
    data: [],
    error: null
  };
}

function asyncResourceReducer(state, action) {
  switch (action.type) {
    case "start":
      return { status: "loading", data: [], error: null };
    case "success":
      return { status: "success", data: action.payload, error: null };
    case "error":
      return { status: "error", data: [], error: action.message };
    default:
      return state;
  }
}

let state = createAsyncResourceState();
state = asyncResourceReducer(state, { type: "start" });
state = asyncResourceReducer(state, {
  type: "success",
  payload: ["Duyuru", "Etkinlik", "Not Paylaşımı"]
});

console.log(`status=${state.status};count=${state.data.length};error=${state.error ?? "none"}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
