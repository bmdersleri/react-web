---
code_id: "react_ch14_code06"
language: "javascript"
test_status: "passed"
title: "react_ch14_code06"
parent: "Bölüm 14: Zustand"
grand_parent: "Kod Örnekleri"
---

# chapter_14_react_ch14_code06_state_tool_decision.js

**Kod kimliği:** `react_ch14_code06`  
**Bölüm kimliği:** `chapter_14`  
**Dosya:** `chapter_14_react_ch14_code06_state_tool_decision.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum14/kod06/chapter_14_react_ch14_code06_state_tool_decision.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum14/kod06
- Repository yolu: `kodlar/bolum14/kod06/chapter_14_react_ch14_code06_state_tool_decision.js`

## Kaynak kod

```javascript
function chooseStateTool({ scope, complexity, source }) {
  if (scope === "single-component") {
    return "local-state";
  }

  if (source === "server") {
    return "query-layer";
  }

  if (scope === "global" && complexity === "low") {
    return "zustand";
  }

  if (scope === "global" && complexity === "high") {
    return "redux-toolkit";
  }

  return "custom-hook";
}

const theme = chooseStateTool({ scope: "global", complexity: "low", source: "client" });
const wizard = chooseStateTool({ scope: "global", complexity: "high", source: "client" });
const input = chooseStateTool({ scope: "single-component", complexity: "low", source: "client" });

console.log(`theme=${theme} | wizard=${wizard} | input=${input}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
