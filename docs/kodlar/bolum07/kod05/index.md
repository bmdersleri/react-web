---
title: "cleanup_subscription_registry"
code_id: "react_ch07_code05"
language: "javascript"
test_status: "passed"
---

# cleanup_subscription_registry

**Kod kimliği:** `react_ch07_code05`  
**Bölüm kimliği:** `chapter_07`  
**Dosya:** `cleanup_subscription_registry.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum07/kod05/cleanup_subscription_registry.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum07/kod05
- Repository yolu: `kodlar/bolum07/kod05/cleanup_subscription_registry.js`

## Kaynak kod

```javascript
class SubscriptionRegistry {
  constructor() {
    this.active = new Set();
  }

  subscribe(name) {
    this.active.add(name);
    return () => this.active.delete(name);
  }

  count() {
    return this.active.size;
  }
}

const registry = new SubscriptionRegistry();
const cleanupTimer = registry.subscribe("event-countdown-timer");
const cleanupResize = registry.subscribe("window-resize-listener");

console.log(`activeBeforeCleanup:${registry.count()}`);
cleanupTimer();
cleanupResize();
console.log(`activeAfterCleanup:${registry.count()}`);
console.log(registry.count() === 0 ? "cleanup-ok" : "cleanup-missing");
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
