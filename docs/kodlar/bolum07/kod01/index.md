---
code_id: "react_ch07_code01"
language: "javascript"
test_status: "passed"
title: "effect_candidate_classifier"
parent: "Bölüm 7: useEffect ve Yan Etkiler"
grand_parent: "Kod Örnekleri"
---

# effect_candidate_classifier

**Kod kimliği:** `react_ch07_code01`  
**Bölüm kimliği:** `chapter_07`  
**Dosya:** `effect_candidate_classifier.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum07/kod01/effect_candidate_classifier.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum07/kod01
- Repository yolu: `kodlar/bolum07/kod01/effect_candidate_classifier.js`

## Kaynak kod

```javascript
const tasks = [
  { name: "documentTitle", touchesExternalSystem: true },
  { name: "visibleModules", touchesExternalSystem: false },
  { name: "timer", touchesExternalSystem: true },
  { name: "activeCssClass", touchesExternalSystem: false }
];

function classifyTask(task) {
  return task.touchesExternalSystem ? "effect" : "render";
}

for (const task of tasks) {
  console.log(`${task.name}: ${classifyTask(task)}`);
}
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
