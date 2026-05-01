function chooseStateTool({ scope, complexity, source }) {
  if (scope === "single-component") {
    return "local-state";
  }

  if (source === "server") {
    return "query-layer";
  }

  if (scope === "global" && complexity === "low") {
    return "zustand";
  }

  if (scope === "global" && complexity === "high") {
    return "redux-toolkit";
  }

  return "custom-hook";
}

const theme = chooseStateTool({ scope: "global", complexity: "low", source: "client" });
const wizard = chooseStateTool({ scope: "global", complexity: "high", source: "client" });
const input = chooseStateTool({ scope: "single-component", complexity: "low", source: "client" });

console.log(`theme=${theme} | wizard=${wizard} | input=${input}`);
