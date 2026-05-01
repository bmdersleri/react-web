---
title: "chapter_15_react_ch15_code03_test_matrix.js"
code_id: "react_ch15_code03"
language: "javascript"
test_status: "passed"
---

# chapter_15_react_ch15_code03_test_matrix.js

**Kod kimliği:** `react_ch15_code03`  
**Bölüm kimliği:** `chapter_15`  
**Dosya:** `chapter_15_react_ch15_code03_test_matrix.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum15/kod03/chapter_15_react_ch15_code03_test_matrix.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum15/kod03
- Repository yolu: `kodlar/bolum15/kod03/chapter_15_react_ch15_code03_test_matrix.js`

## Kaynak kod

```javascript
const components = [
  { name: "AnnouncementCard", risks: ["title", "category"] },
  { name: "ProfileSummary", risks: ["empty-user"] },
  { name: "NoteFilter", risks: ["query", "empty-result"] }
];

function createTestMatrix(items) {
  return items.flatMap((component) =>
    component.risks.map((risk) => ({
      component: component.name,
      scenario: `${component.name}:${risk}`,
      critical: risk.includes("empty") || risk === "query"
    }))
  );
}

const matrix = createTestMatrix(components);
const criticalCount = matrix.filter((test) => test.critical).length;
console.log(`tests=${matrix.length} | critical=${criticalCount}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
