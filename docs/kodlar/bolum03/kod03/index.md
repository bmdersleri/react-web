---
code_id: "react_ch03_code03"
language: "javascript"
test_status: "passed"
title: "kampushub_component_inventory"
parent: "Bölüm 3: HTML/CSS ve Bileşen"
grand_parent: "Kod Örnekleri"
---

# kampushub_component_inventory

**Kod kimliği:** `react_ch03_code03`  
**Bölüm kimliği:** `chapter_03`  
**Dosya:** `kampushub_component_inventory.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum03/kod03/kampushub_component_inventory.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum03/kod03
- Repository yolu: `kodlar/bolum03/kod03/kampushub_component_inventory.js`

## Kaynak kod

```javascript
const componentInventory = [
  "AppShell",
  "Header",
  "MainNavigation",
  "HeroPanel",
  "ModuleGrid",
  "ModuleCard",
  "AnnouncementList",
  "AnnouncementItem",
  "EventPreview",
  "UserSummary",
  "Footer"
];

function summarizeInventory(components) {
  return `KampüsHub bileşen sayısı: ${components.length}`;
}

console.log(summarizeInventory(componentInventory));
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
