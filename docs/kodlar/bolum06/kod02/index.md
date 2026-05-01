---
code_id: "react_ch06_code02"
language: "javascript"
test_status: "passed"
title: "selected_module_state_transition"
parent: "Bölüm 6: State Yönetimi"
grand_parent: "Kod Örnekleri"
---

# selected_module_state_transition

**Kod kimliği:** `react_ch06_code02`  
**Bölüm kimliği:** `chapter_06`  
**Dosya:** `selected_module_state_transition.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum06/kod02/selected_module_state_transition.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum06/kod02
- Repository yolu: `kodlar/bolum06/kod02/selected_module_state_transition.js`

## Kaynak kod

```javascript
function selectModule(previousState, moduleId) {
  return {
    ...previousState,
    selectedModuleId: moduleId
  };
}

const beforeState = {
  selectedModuleId: null,
  unreadAnnouncementCount: 4
};

const afterState = selectModule(beforeState, "events");

console.log(`before: ${beforeState.selectedModuleId ?? "none"}`);
console.log(`after: ${afterState.selectedModuleId}`);
console.log(`changed: ${beforeState !== afterState}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
