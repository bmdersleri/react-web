function createMemoryStorage() {
  const data = new Map();
  return {
    getItem(key) {
      return data.has(key) ? data.get(key) : null;
    },
    setItem(key, value) {
      data.set(key, String(value));
    },
    keys() {
      return Array.from(data.keys()).sort();
    }
  };
}

function createPreferenceStore(storage, namespace) {
  return {
    getPreference(name, fallbackValue) {
      const stored = storage.getItem(`${namespace}.${name}`);
      return stored === null ? fallbackValue : stored;
    },
    setPreference(name, value) {
      storage.setItem(`${namespace}.${name}`, value);
      return value;
    }
  };
}

const storage = createMemoryStorage();
const preferences = createPreferenceStore(storage, "campushub");

preferences.setPreference("theme", "dark");
preferences.setPreference("density", "compact");

console.log(
  `theme=${preferences.getPreference("theme", "light")};density=${preferences.getPreference("density", "comfortable")};keys=${storage.keys().join(",")}`
);
