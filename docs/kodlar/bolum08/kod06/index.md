---
code_id: "react_ch08_code06"
language: "javascript"
test_status: "passed"
title: "timer_ref_cleanup_simulation"
parent: "Bölüm 8: İleri Hooks"
grand_parent: "Kod Örnekleri"
---

# timer_ref_cleanup_simulation

**Kod kimliği:** `react_ch08_code06`  
**Bölüm kimliği:** `chapter_08`  
**Dosya:** `timer_ref_cleanup_simulation.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum08/kod06/timer_ref_cleanup_simulation.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum08/kod06
- Repository yolu: `kodlar/bolum08/kod06/timer_ref_cleanup_simulation.js`

## Kaynak kod

```javascript
function createTimerRef() {
  return { current: null };
}

function startTimer(timerRef, id) {
  timerRef.current = id;
  return "timer:active";
}

function cleanupTimer(timerRef) {
  if (timerRef.current !== null) {
    timerRef.current = null;
    return "timer:cleaned";
  }
  return "timer:empty";
}

const timerRef = createTimerRef();
console.log(startTimer(timerRef, 42));
console.log(cleanupTimer(timerRef));
console.log(`current:${timerRef.current}`);
console.log("cleanup-ok");
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
