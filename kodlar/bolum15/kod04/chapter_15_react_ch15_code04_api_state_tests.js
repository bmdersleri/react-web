const apiStates = {
  loading: { visibleText: "Duyurular yükleniyor..." },
  error: { visibleText: "Duyurular alınamadı." },
  success: { visibleText: "3 duyuru listelendi." }
};

function mapApiStatesToAssertions(states) {
  return Object.entries(states).map(([state, config]) => ({
    state,
    assertion: `screen shows: ${config.visibleText}`
  }));
}

const assertions = mapApiStatesToAssertions(apiStates);
console.log(`states=${assertions.map((item) => item.state).join(",")} | assertions=${assertions.length}`);
