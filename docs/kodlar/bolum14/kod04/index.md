---
title: "chapter_14_react_ch14_code04_subscription_simulation.js"
code_id: "react_ch14_code04"
language: "javascript"
test_status: "passed"
---

# chapter_14_react_ch14_code04_subscription_simulation.js

**Kod kimliği:** `react_ch14_code04`  
**Bölüm kimliği:** `chapter_14`  
**Dosya:** `chapter_14_react_ch14_code04_subscription_simulation.js`  
**Dil:** `javascript`  
**Test durumu:** `passed`

## Bağlantılar

- GitHub kaynak dosyası: https://github.com/bmdersleri/react-web/blob/main/kodlar/bolum14/kod04/chapter_14_react_ch14_code04_subscription_simulation.js
- Açıklama sayfası: https://bmdersleri.github.io/react-web/kodlar/bolum14/kod04
- Repository yolu: `kodlar/bolum14/kod04/chapter_14_react_ch14_code04_subscription_simulation.js`

## Kaynak kod

```javascript
function createSubscriptionTracker(initialState) {
  let state = initialState;
  const subscriptions = [];

  return {
    subscribe(selector, listener) {
      subscriptions.push({
        selector,
        listener,
        previousValue: selector(state),
      });
    },
    setState(updater) {
      state = updater(state);
      subscriptions.forEach((subscription) => {
        const nextValue = subscription.selector(state);
        if (!Object.is(nextValue, subscription.previousValue)) {
          subscription.listener(nextValue, subscription.previousValue);
          subscription.previousValue = nextValue;
        }
      });
    },
  };
}

let themeChanges = 0;
let categoryChanges = 0;

const tracker = createSubscriptionTracker({
  theme: "light",
  category: "all",
});

tracker.subscribe((state) => state.theme, () => {
  themeChanges += 1;
});

tracker.subscribe((state) => state.category, () => {
  categoryChanges += 1;
});

tracker.setState((state) => ({ ...state, theme: "dark" }));
tracker.setState((state) => ({ ...state, category: "academic" }));
tracker.setState((state) => ({ ...state, theme: "dark" }));

console.log(`theme changes: ${themeChanges} | category changes: ${categoryChanges}`);
```

## Not

Bu sayfa BookFactory tarafından CODE_META bloğundan otomatik üretilmiştir.
