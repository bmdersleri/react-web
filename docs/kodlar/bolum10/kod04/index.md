---
code_id: "react_ch10_code06"
language: "javascript"
test_status: "passed"
title: "react_ch10_code06"
parent: "Bölüm 10: React Router"
grand_parent: "Kod Örnekleri"
---

# react_ch10_code06_query_access.js

**Kod kimliği:** `react_ch10_code06`  
**Bölüm kimliği:** `chapter_10`  
**Dosya:** `react_ch10_code06_query_access.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum10/kod04/react_ch10_code06_query_access.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum10/kod04
- Repository yolu: `kodlar/bolum10/kod04/react_ch10_code06_query_access.js`

## Kaynak kod

```javascript
function readCategoryFromUrl(url) {
  const parsedUrl = new URL(url, "https://kampushub.example");
  return parsedUrl.searchParams.get("category") ?? "all";
}

function decideRouteAccess(route, user) {
  const protectedRoutes = ["/profile"];
  if (protectedRoutes.includes(route) && !user.isAuthenticated) {
    return "redirect:/login";
  }
  return "allow";
}

const category = readCategoryFromUrl("/announcements?category=exam");
const profileAccess = decideRouteAccess("/profile", { isAuthenticated: false });
const notesAccess = decideRouteAccess("/notes", { isAuthenticated: false });

console.log(`category=${category};profileAccess=${profileAccess};notesAccess=${notesAccess}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
