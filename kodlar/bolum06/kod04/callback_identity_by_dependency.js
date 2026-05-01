function createCallbackCache() {
  let previousDependency = undefined;
  let previousCallback = undefined;

  return function getCallback(dependency) {
    if (previousCallback && Object.is(previousDependency, dependency)) {
      return previousCallback;
    }

    previousDependency = dependency;
    previousCallback = function selectModule(moduleId) {
      return `${dependency}:${moduleId}`;
    };

    return previousCallback;
  };
}

const getCallback = createCallbackCache();
const first = getCallback("student-1");
const second = getCallback("student-1");
const third = getCallback("student-2");

console.log(`same:${first === second}`);
console.log(`changed:${first !== third}`);
console.log(first("events"));
console.log(third("events"));
console.log("callback-ok");
