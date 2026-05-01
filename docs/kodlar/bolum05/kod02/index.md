---
code_id: "react_ch05_code02"
language: "javascript"
test_status: "passed"
title: "destructuring_default_values"
parent: "Bölüm 5: Props ve Veri Akışı"
grand_parent: "Kod Örnekleri"
---

# destructuring_default_values

**Kod kimliği:** `react_ch05_code02`  
**Bölüm kimliği:** `chapter_05`  
**Dosya:** `destructuring_default_values.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum05/kod02/destructuring_default_values.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum05/kod02
- Repository yolu: `kodlar/bolum05/kod02/destructuring_default_values.js`

## Kaynak kod

```javascript
function formatProfileBadge({ name = "Misafir Kullanıcı", role = "Öğrenci", online = false } = {}) {
  const statusText = online ? "Çevrim içi" : "Çevrim dışı";
  return `${name} | ${role} | ${statusText}`;
}

console.log(formatProfileBadge({ name: "Ayşe KAYA", role: "Öğrenci", online: true }));
console.log(formatProfileBadge());
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
