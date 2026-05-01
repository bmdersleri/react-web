---
title: "initial_dashboard_state_summary"
code_id: "react_ch06_code01"
language: "javascript"
test_status: "passed"
---

# initial_dashboard_state_summary

**Kod kimliği:** `react_ch06_code01`  
**Bölüm kimliği:** `chapter_06`  
**Dosya:** `initial_dashboard_state_summary.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum06/kod01/initial_dashboard_state_summary.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum06/kod01
- Repository yolu: `kodlar/bolum06/kod01/initial_dashboard_state_summary.js`

## Kaynak kod

```javascript
const dashboardState = {
  appName: "KampüsHub",
  selectedModuleId: null,
  unreadAnnouncementCount: 4,
  isProfileOpen: false
};

function summarizeDashboardState(state) {
  const selected = state.selectedModuleId ?? "none";
  return `${state.appName} | selectedModule: ${selected} | unread: ${state.unreadAnnouncementCount}`;
}

console.log(summarizeDashboardState(dashboardState));
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
