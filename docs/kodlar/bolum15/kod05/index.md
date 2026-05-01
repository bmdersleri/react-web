---
code_id: "react_ch15_code05"
language: "javascript"
test_status: "passed"
title: "react_ch15_code05"
parent: "Bölüm 15: Performans ve Test"
grand_parent: "Kod Örnekleri"
---

# chapter_15_react_ch15_code05_vite_scripts.js

**Kod kimliği:** `react_ch15_code05`  
**Bölüm kimliği:** `chapter_15`  
**Dosya:** `chapter_15_react_ch15_code05_vite_scripts.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum15/kod05/chapter_15_react_ch15_code05_vite_scripts.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum15/kod05
- Repository yolu: `kodlar/bolum15/kod05/chapter_15_react_ch15_code05_vite_scripts.js`

## Kaynak kod

```javascript
const packageJson = {
  scripts: {
    dev: "vite",
    test: "vitest",
    build: "vite build",
    preview: "vite preview"
  }
};

function validateDeploymentScripts(config) {
  const scripts = config.scripts || {};
  const required = ["build", "preview", "test"];
  const missing = required.filter((name) => !scripts[name]);
  return {
    ok: missing.length === 0,
    missing,
    build: scripts.build,
    preview: scripts.preview
  };
}

const result = validateDeploymentScripts(packageJson);
console.log(`scripts=${result.ok ? "ok" : "missing"} | build=${result.build} | preview=${result.preview}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
