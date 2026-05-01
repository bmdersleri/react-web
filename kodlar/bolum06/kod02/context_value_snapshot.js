function createContextSnapshot(value) {
  return {
    read(key) {
      return value[key];
    },
    keys() {
      return Object.keys(value);
    }
  };
}

const appPreferences = createContextSnapshot({
  themeName: "academic-light",
  currentUser: "demo-student",
  compactMode: false
});

console.log(`theme:${appPreferences.read("themeName")}`);
console.log(`user:${appPreferences.read("currentUser")}`);
console.log(`keys:${appPreferences.keys().join(",")}`);
console.log("context-ok");
