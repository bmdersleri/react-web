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
