---
code_id: "react_ch03_code01"
language: "javascript"
test_status: "passed"
title: "html_nav_to_data_model"
parent: "Bölüm 3: HTML/CSS ve Bileşen"
grand_parent: "Kod Örnekleri"
---

# html_nav_to_data_model

**Kod kimliği:** `react_ch03_code01`  
**Bölüm kimliği:** `chapter_03`  
**Dosya:** `html_nav_to_data_model.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum03/kod01/html_nav_to_data_model.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum03/kod01
- Repository yolu: `kodlar/bolum03/kod01/html_nav_to_data_model.js`

## Kaynak kod

```javascript
const navigationLinks = [
  { label: "Duyurular", href: "/announcements" },
  { label: "Etkinlikler", href: "/events" },
  { label: "Not Paylaşımı", href: "/notes" },
  { label: "Profil", href: "/profile" }
];

function createNavigationLabelList(links) {
  return links.map((link) => link.label).join(" | ");
}

console.log(createNavigationLabelList(navigationLinks));
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
