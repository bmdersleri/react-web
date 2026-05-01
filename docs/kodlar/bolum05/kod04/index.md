---
code_id: "react_ch05_code04"
language: "javascript"
test_status: "passed"
title: "parent_child_data_flow"
parent: "Bölüm 5: Props ve Veri Akışı"
grand_parent: "Kod Örnekleri"
---

# parent_child_data_flow

**Kod kimliği:** `react_ch05_code04`  
**Bölüm kimliği:** `chapter_05`  
**Dosya:** `parent_child_data_flow.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum05/kod04/parent_child_data_flow.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum05/kod04
- Repository yolu: `kodlar/bolum05/kod04/parent_child_data_flow.js`

## Kaynak kod

```javascript
function ModuleCard(props) {
  return `Child çıktı üretti: ${props.title} (${props.status})`;
}

function App() {
  const moduleProps = {
    title: "Duyurular",
    status: "3 yeni duyuru"
  };

  return `App -> ModuleCard\n${ModuleCard(moduleProps)}`;
}

console.log(App());
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
