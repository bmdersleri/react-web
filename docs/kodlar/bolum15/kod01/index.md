---
code_id: "react_ch15_code01"
language: "javascript"
test_status: "passed"
title: "react_ch15_code01"
parent: "Bölüm 15: Performans ve Test"
grand_parent: "Kod Örnekleri"
---

# chapter_15_react_ch15_code01_memo_decision.js

**Kod kimliği:** `react_ch15_code01`  
**Bölüm kimliği:** `chapter_15`  
**Dosya:** `chapter_15_react_ch15_code01_memo_decision.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum15/kod01/chapter_15_react_ch15_code01_memo_decision.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum15/kod01
- Repository yolu: `kodlar/bolum15/kod01/chapter_15_react_ch15_code01_memo_decision.js`

## Kaynak kod

```javascript
const announcements = [
  { id: 1, title: "Vize takvimi", category: "Ders" },
  { id: 2, title: "React atölyesi", category: "Etkinlik" },
  { id: 3, title: "Final duyurusu", category: "Ders" },
  { id: 4, title: "Kütüphane saatleri", category: "Kampüs" },
  { id: 5, title: "Proje teslimi", category: "Ders" },
  { id: 6, title: "Spor turnuvası", category: "Etkinlik" }
];

function filterAnnouncements(items, category) {
  return items.filter((item) => item.category === category);
}

function chooseMemoStrategy({ listSize, queryChanged, calculationMs }) {
  if (listSize >= 5 && !queryChanged && calculationMs >= 4) {
    return {
      strategy: "memoize",
      reason: "large-list-stable-query"
    };
  }
  return {
    strategy: "direct",
    reason: "cheap-or-changing"
  };
}

const visible = filterAnnouncements(announcements, "Ders");
const decision = chooseMemoStrategy({
  listSize: announcements.length,
  queryChanged: false,
  calculationMs: 6
});

console.log(`visible=${visible.length} | strategy=${decision.strategy} | reason=${decision.reason}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
