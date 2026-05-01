---
code_id: "react_ch15_code04"
language: "javascript"
test_status: "passed"
title: "react_ch15_code04"
parent: "Bölüm 15: Performans ve Test"
grand_parent: "Kod Örnekleri"
---

# chapter_15_react_ch15_code04_api_state_tests.js

**Kod kimliği:** `react_ch15_code04`  
**Bölüm kimliği:** `chapter_15`  
**Dosya:** `chapter_15_react_ch15_code04_api_state_tests.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum15/kod04/chapter_15_react_ch15_code04_api_state_tests.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum15/kod04
- Repository yolu: `kodlar/bolum15/kod04/chapter_15_react_ch15_code04_api_state_tests.js`

## Kaynak kod

```javascript
const apiStates = {
  loading: { visibleText: "Duyurular yükleniyor..." },
  error: { visibleText: "Duyurular alınamadı." },
  success: { visibleText: "3 duyuru listelendi." }
};

function mapApiStatesToAssertions(states) {
  return Object.entries(states).map(([state, config]) => ({
    state,
    assertion: `screen shows: ${config.visibleText}`
  }));
}

const assertions = mapApiStatesToAssertions(apiStates);
console.log(`states=${assertions.map((item) => item.state).join(",")} | assertions=${assertions.length}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
