const loggedReducer = (state = false, action) => {
  switch (action.type) {
    case "LOGGED":
      return action.payload;
    default:
      return state;
  }
};

module.exports = { loggedReducer };
