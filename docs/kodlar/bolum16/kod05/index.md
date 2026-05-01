---
code_id: "react_ch16_code05"
language: "javascript"
test_status: "passed"
title: "react_ch16_code05"
parent: "Bölüm 16: KampüsHub Final"
grand_parent: "Kod Örnekleri"
---

# chapter_16_react_ch16_code05_env_validation.js

**Kod kimliği:** `react_ch16_code05`  
**Bölüm kimliği:** `chapter_16`  
**Dosya:** `chapter_16_react_ch16_code05_env_validation.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum16/kod05/chapter_16_react_ch16_code05_env_validation.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum16/kod05
- Repository yolu: `kodlar/bolum16/kod05/chapter_16_react_ch16_code05_env_validation.js`

## Kaynak kod

```javascript
function validatePublicEnv(env) {
  const requiredKeys = ["VITE_API_BASE_URL", "MODE"];
  const missing = requiredKeys.filter((key) => !env[key]);

  return {
    ok: missing.length === 0,
    missing,
    apiBase: env.VITE_API_BASE_URL,
    mode: env.MODE,
  };
}

const result = validatePublicEnv({
  VITE_API_BASE_URL: "/api",
  MODE: "production",
});

console.log(
  `env=${result.ok ? "ok" : "missing"} | apiBase=${result.apiBase} | mode=${result.mode}`,
);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
