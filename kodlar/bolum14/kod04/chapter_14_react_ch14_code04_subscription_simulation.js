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
