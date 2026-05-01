const initialState = {
  status: "idle",
  data: [],
  errorMessage: "",
};

function apiStateReducer(state, action) {
  switch (action.type) {
    case "requestStarted":
      return { ...state, status: "loading", errorMessage: "" };
    case "requestSucceeded":
      return { ...state, status: "success", data: action.payload, errorMessage: "" };
    case "requestFailed":
      return { ...state, status: "error", errorMessage: action.payload };
    default:
      return state;
  }
}

let state = initialState;
state = apiStateReducer(state, { type: "requestStarted" });
state = apiStateReducer(state, {
  type: "requestSucceeded",
  payload: ["Vize takvimi", "Kariyer günleri"],
});

console.log(`${state.status} | data: ${state.data.length} | error: ${state.errorMessage || "yok"}`);
