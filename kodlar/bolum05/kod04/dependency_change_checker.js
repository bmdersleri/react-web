function shouldRunEffect(previousDeps, nextDeps) {
  if (previousDeps === undefined || nextDeps === undefined) return true;
  if (previousDeps.length !== nextDeps.length) return true;

  return nextDeps.some((value, index) => !Object.is(value, previousDeps[index]));
}

const previous = ["announcements", 4];
const same = ["announcements", 4];
const changed = ["events", 4];
const missing = ["announcements"];

console.log(`sameDeps:${shouldRunEffect(previous, same)}`);
console.log(`changedDeps:${shouldRunEffect(previous, changed)}`);
console.log(`missingDeps:${shouldRunEffect(previous, missing)}`);
