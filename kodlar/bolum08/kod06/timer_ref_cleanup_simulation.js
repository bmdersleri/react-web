function createTimerRef() {
  return { current: null };
}

function startTimer(timerRef, id) {
  timerRef.current = id;
  return "timer:active";
}

function cleanupTimer(timerRef) {
  if (timerRef.current !== null) {
    timerRef.current = null;
    return "timer:cleaned";
  }
  return "timer:empty";
}

const timerRef = createTimerRef();
console.log(startTimer(timerRef, 42));
console.log(cleanupTimer(timerRef));
console.log(`current:${timerRef.current}`);
console.log("cleanup-ok");
