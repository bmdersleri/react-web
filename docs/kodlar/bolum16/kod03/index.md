---
code_id: "react_ch16_code03"
language: "javascript"
test_status: "passed"
title: "react_ch16_code03"
parent: "Bölüm 16: KampüsHub Final"
grand_parent: "Kod Örnekleri"
---

# chapter_16_react_ch16_code03_state_ownership.js

**Kod kimliği:** `react_ch16_code03`  
**Bölüm kimliği:** `chapter_16`  
**Dosya:** `chapter_16_react_ch16_code03_state_ownership.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum16/kod03/chapter_16_react_ch16_code03_state_ownership.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum16/kod03
- Repository yolu: `kodlar/bolum16/kod03/chapter_16_react_ch16_code03_state_ownership.js`

## Kaynak kod

```javascript
function decideStateOwner(stateName) {
  const owners = {
    noteForm: "local-form",
    theme: "zustand",
    notifications: "redux",
    currentRoute: "router",
    announcements: "server-cache",
  };

  return owners[stateName] ?? "component-state";
}

const summary = [
  `form=${decideStateOwner("noteForm")}`,
  `theme=${decideStateOwner("theme")}`,
  `notifications=${decideStateOwner("notifications")}`,
  `route=${decideStateOwner("currentRoute")}`,
].join(" | ");

console.log(summary);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
