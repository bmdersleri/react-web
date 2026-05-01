---
code_id: "react_ch13_code04"
language: "javascript"
test_status: "passed"
title: "react_ch13_code04"
parent: "Bölüm 13: REST API"
grand_parent: "Kod Örnekleri"
---

# chapter_13_react_ch13_code04_loading_state_reducer.js

**Kod kimliği:** `react_ch13_code04`  
**Bölüm kimliği:** `chapter_13`  
**Dosya:** `chapter_13_react_ch13_code04_loading_state_reducer.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum13/kod04/chapter_13_react_ch13_code04_loading_state_reducer.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum13/kod04
- Repository yolu: `kodlar/bolum13/kod04/chapter_13_react_ch13_code04_loading_state_reducer.js`

## Kaynak kod

```javascript
const initialState = {
  status: "idle",
  data: [],
  errorMessage: "",
};

function apiStateReducer(state, action) {
  switch (action.type) {
    case "requestStarted":
      return { ...state, status: "loading", errorMessage: "" };
    case "requestSucceeded":
      return { ...state, status: "success", data: action.payload, errorMessage: "" };
    case "requestFailed":
      return { ...state, status: "error", errorMessage: action.payload };
    default:
      return state;
  }
}

let state = initialState;
state = apiStateReducer(state, { type: "requestStarted" });
state = apiStateReducer(state, {
  type: "requestSucceeded",
  payload: ["Vize takvimi", "Kariyer günleri"],
});

console.log(`${state.status} | data: ${state.data.length} | error: ${state.errorMessage || "yok"}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
