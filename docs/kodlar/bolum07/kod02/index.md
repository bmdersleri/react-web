---
title: "dependency_array_decision"
code_id: "react_ch07_code02"
language: "javascript"
test_status: "passed"
---

# dependency_array_decision

**Kod kimliği:** `react_ch07_code02`  
**Bölüm kimliği:** `chapter_07`  
**Dosya:** `dependency_array_decision.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum07/kod02/dependency_array_decision.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum07/kod02
- Repository yolu: `kodlar/bolum07/kod02/dependency_array_decision.js`

## Kaynak kod

```javascript
const effectPatterns = [
  { dependencyArray: undefined, label: "noArray" },
  { dependencyArray: [], label: "emptyArray" },
  { dependencyArray: ["selectedModuleId"], label: "selectedModuleId" }
];

function describePattern(pattern) {
  if (pattern.dependencyArray === undefined) return "every-render";
  if (pattern.dependencyArray.length === 0) return "mount-only";
  return "when-value-changes";
}

for (const pattern of effectPatterns) {
  console.log(`${pattern.label}: ${describePattern(pattern)}`);
}
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
