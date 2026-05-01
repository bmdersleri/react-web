function createRefBox(initialValue) {
  return { current: initialValue };
}

function simulateRefUpdates() {
  const counterRef = createRefBox(0);
  let renderCount = 1;

  counterRef.current += 1;
  counterRef.current += 1;
  counterRef.current += 1;

  return {
    current: counterRef.current,
    renderCount
  };
}

const result = simulateRefUpdates();
console.log(`current:${result.current}`);
console.log(`renders:${result.renderCount}`);
console.log("ref-ok");
