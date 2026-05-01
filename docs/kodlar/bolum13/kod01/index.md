---
code_id: "react_ch13_code01"
language: "javascript"
test_status: "passed"
title: "react_ch13_code01"
parent: "Bölüm 13: REST API"
grand_parent: "Kod Örnekleri"
---

# chapter_13_react_ch13_code01_endpoint_builder.js

**Kod kimliği:** `react_ch13_code01`  
**Bölüm kimliği:** `chapter_13`  
**Dosya:** `chapter_13_react_ch13_code01_endpoint_builder.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum13/kod01/chapter_13_react_ch13_code01_endpoint_builder.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum13/kod01
- Repository yolu: `kodlar/bolum13/kod01/chapter_13_react_ch13_code01_endpoint_builder.js`

## Kaynak kod

```javascript
function buildEndpoint(resource, params = {}) {
  const basePaths = {
    announcements: "/api/announcements",
    events: "/api/events",
    notes: "/api/notes",
    preferences: "/api/profile/preferences",
  };

  const basePath = basePaths[resource];
  if (!basePath) {
    throw new Error(`Unknown resource: ${resource}`);
  }

  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.set(key, String(value));
    }
  });

  const queryString = query.toString();
  return queryString ? `${basePath}?${queryString}` : basePath;
}

console.log(buildEndpoint("events", { category: "academic", limit: 5 }));
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
