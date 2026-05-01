---
code_id: "react_ch05_code01"
language: "javascript"
test_status: "passed"
title: "props_like_object_to_card_text"
parent: "Bölüm 5: Props ve Veri Akışı"
grand_parent: "Kod Örnekleri"
---

# props_like_object_to_card_text

**Kod kimliği:** `react_ch05_code01`  
**Bölüm kimliği:** `chapter_05`  
**Dosya:** `props_like_object_to_card_text.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum05/kod01/props_like_object_to_card_text.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum05/kod01
- Repository yolu: `kodlar/bolum05/kod01/props_like_object_to_card_text.js`

## Kaynak kod

```javascript
function renderModuleCard(props) {
  return `${props.appName}: ${props.title} - ${props.description} (${props.status})`;
}

const announcementModule = {
  appName: "KampüsHub",
  title: "Duyurular",
  description: "Ders ve bölüm duyurularını takip edin.",
  status: "3 yeni duyuru"
};

console.log(renderModuleCard(announcementModule));
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
