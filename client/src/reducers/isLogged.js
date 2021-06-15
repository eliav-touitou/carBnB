const loggedReducer = (state = false, action) => {
  switch (action.type) {
    case "ISLOGGED":
      return action.payload;
    default:
      return state;
  }
};

module.exports = { loggedReducer };
