const promptOrNormalReducer = (state = "normal", action) => {
  switch (action.type) {
    case "SETPROMPTORNORMAL":
      return action.payload;
    default:
      return state;
  }
};

module.exports = { promptOrNormalReducer };
