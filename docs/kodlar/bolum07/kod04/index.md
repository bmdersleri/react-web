---
title: "dependency_change_checker"
code_id: "react_ch07_code04"
language: "javascript"
test_status: "passed"
---

# dependency_change_checker

**Kod kimliği:** `react_ch07_code04`  
**Bölüm kimliği:** `chapter_07`  
**Dosya:** `dependency_change_checker.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum07/kod04/dependency_change_checker.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum07/kod04
- Repository yolu: `kodlar/bolum07/kod04/dependency_change_checker.js`

## Kaynak kod

```javascript
function shouldRunEffect(previousDeps, nextDeps) {
  if (previousDeps === undefined || nextDeps === undefined) return true;
  if (previousDeps.length !== nextDeps.length) return true;

  return nextDeps.some((value, index) => !Object.is(value, previousDeps[index]));
}

const previous = ["announcements", 4];
const same = ["announcements", 4];
const changed = ["events", 4];
const missing = ["announcements"];

console.log(`sameDeps:${shouldRunEffect(previous, same)}`);
console.log(`changedDeps:${shouldRunEffect(previous, changed)}`);
console.log(`missingDeps:${shouldRunEffect(previous, missing)}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
