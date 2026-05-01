---
code_id: "react_ch08_code04"
language: "javascript"
test_status: "passed"
title: "callback_identity_by_dependency"
parent: "Bölüm 8: İleri Hooks"
grand_parent: "Kod Örnekleri"
---

# callback_identity_by_dependency

**Kod kimliği:** `react_ch08_code04`  
**Bölüm kimliği:** `chapter_08`  
**Dosya:** `callback_identity_by_dependency.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum08/kod04/callback_identity_by_dependency.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum08/kod04
- Repository yolu: `kodlar/bolum08/kod04/callback_identity_by_dependency.js`

## Kaynak kod

```javascript
function createCallbackCache() {
  let previousDependency = undefined;
  let previousCallback = undefined;

  return function getCallback(dependency) {
    if (previousCallback && Object.is(previousDependency, dependency)) {
      return previousCallback;
    }

    previousDependency = dependency;
    previousCallback = function selectModule(moduleId) {
      return `${dependency}:${moduleId}`;
    };

    return previousCallback;
  };
}

const getCallback = createCallbackCache();
const first = getCallback("student-1");
const second = getCallback("student-1");
const third = getCallback("student-2");

console.log(`same:${first === second}`);
console.log(`changed:${first !== third}`);
console.log(first("events"));
console.log(third("events"));
console.log("callback-ok");
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
