---
code_id: "react_ch12_code01"
language: "javascript"
test_status: "passed"
title: "react_ch12_code01"
parent: "Bölüm 12: Redux Toolkit"
grand_parent: "Kod Örnekleri"
---

# chapter_12_react_ch12_code01_state_scope.js

**Kod kimliği:** `react_ch12_code01`  
**Bölüm kimliği:** `chapter_12`  
**Dosya:** `chapter_12_react_ch12_code01_state_scope.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum12/kod01/chapter_12_react_ch12_code01_state_scope.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum12/kod01
- Repository yolu: `kodlar/bolum12/kod01/chapter_12_react_ch12_code01_state_scope.js`

## Kaynak kod

```javascript
const stateCandidates = [
  { name: "theme", usedBy: ["Header", "Profile", "Dashboard"], changesOften: false },
  { name: "unreadAnnouncementCount", usedBy: ["Header", "Announcements"], changesOften: true },
  { name: "noteDraftTitle", usedBy: ["NoteForm"], changesOften: true },
  { name: "isProfileModalOpen", usedBy: ["ProfilePage"], changesOften: true },
  { name: "notificationEnabled", usedBy: ["Profile", "Settings", "Header"], changesOften: false },
];

function decideScope(candidate) {
  return candidate.usedBy.length > 1 ? "global" : "local";
}

const summary = stateCandidates.reduce(
  (acc, item) => {
    acc[decideScope(item)] += 1;
    return acc;
  },
  { global: 0, local: 0 }
);

console.log(`global: ${summary.global} | local: ${summary.local}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
