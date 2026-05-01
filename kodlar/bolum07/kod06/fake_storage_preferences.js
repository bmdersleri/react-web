function createMemoryStorage() {
  const data = new Map();

  return {
    setItem(key, value) {
      data.set(key, String(value));
    },
    getItem(key) {
      return data.has(key) ? data.get(key) : null;
    }
  };
}

const storage = createMemoryStorage();

function savePreference(key, value) {
  storage.setItem(`kampushub:${key}`, value);
}

function readPreference(key, fallbackValue) {
  return storage.getItem(`kampushub:${key}`) ?? fallbackValue;
}

savePreference("theme", "dark");
savePreference("selectedModule", "events");

console.log(`theme:${readPreference("theme", "light")}`);
console.log(`selectedModule:${readPreference("selectedModule", "announcements")}`);
console.log(readPreference("theme", "light") === "dark" ? "storage-ok" : "storage-failed");
