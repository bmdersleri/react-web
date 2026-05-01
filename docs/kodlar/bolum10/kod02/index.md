---
code_id: "react_ch10_code02"
language: "javascript"
test_status: "passed"
title: "react_ch10_code02"
parent: "Bölüm 10: React Router"
grand_parent: "Kod Örnekleri"
---

# react_ch10_code02_navlink_active.js

**Kod kimliği:** `react_ch10_code02`  
**Bölüm kimliği:** `chapter_10`  
**Dosya:** `react_ch10_code02_navlink_active.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum10/kod02/react_ch10_code02_navlink_active.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum10/kod02
- Repository yolu: `kodlar/bolum10/kod02/react_ch10_code02_navlink_active.js`

## Kaynak kod

```javascript
function normalizePath(path) {
  if (path.length > 1 && path.endsWith("/")) {
    return path.slice(0, -1);
  }
  return path;
}

function isRouteActive(currentPath, targetPath, options = {}) {
  const current = normalizePath(currentPath);
  const target = normalizePath(targetPath);

  if (options.end) {
    return current === target;
  }

  return current === target || current.startsWith(`${target}/`);
}

const currentPath = "/announcements/42";
const active = isRouteActive(currentPath, "/announcements") ? "announcements" : "none";

console.log(
  `active=${active};home=${isRouteActive(currentPath, "/", { end: true })};profile=${isRouteActive(currentPath, "/profile")}`
);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
