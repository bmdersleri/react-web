---
code_id: "react_ch13_code05"
language: "javascript"
test_status: "passed"
title: "react_ch13_code05"
parent: "Bölüm 13: REST API"
grand_parent: "Kod Örnekleri"
---

# chapter_13_react_ch13_code05_stale_response_guard.js

**Kod kimliği:** `react_ch13_code05`  
**Bölüm kimliği:** `chapter_13`  
**Dosya:** `chapter_13_react_ch13_code05_stale_response_guard.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum13/kod05/chapter_13_react_ch13_code05_stale_response_guard.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum13/kod05
- Repository yolu: `kodlar/bolum13/kod05/chapter_13_react_ch13_code05_stale_response_guard.js`

## Kaynak kod

```javascript
const responses = [
  { requestId: 1, category: "academic", items: ["Seminer"] },
  { requestId: 2, category: "social", items: ["Kulüp buluşması"] },
];

function decideResponseUsage(response, latestRequestId) {
  return response.requestId === latestRequestId ? "accepted" : "ignored";
}

const latestRequestId = 2;
const academicUsage = decideResponseUsage(responses[0], latestRequestId);
const socialUsage = decideResponseUsage(responses[1], latestRequestId);

console.log(`${socialUsage}: ${responses[1].category} | ${academicUsage}: ${responses[0].category}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
