const spinnerReducer = (state = false, action) => {
  switch (action.type) {
    case "SETSPINNER":
      return action.payload;
    default:
      return state;
  }
};

module.exports = { spinnerReducer };
