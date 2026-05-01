function createAsyncResourceState() {
  return {
    status: "idle",
    data: [],
    error: null
  };
}

function asyncResourceReducer(state, action) {
  switch (action.type) {
    case "start":
      return { status: "loading", data: [], error: null };
    case "success":
      return { status: "success", data: action.payload, error: null };
    case "error":
      return { status: "error", data: [], error: action.message };
    default:
      return state;
  }
}

let state = createAsyncResourceState();
state = asyncResourceReducer(state, { type: "start" });
state = asyncResourceReducer(state, {
  type: "success",
  payload: ["Duyuru", "Etkinlik", "Not Paylaşımı"]
});

console.log(`status=${state.status};count=${state.data.length};error=${state.error ?? "none"}`);
