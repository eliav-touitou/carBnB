const showLoginReducer = (state = false, action) => {
  switch (action.type) {
    case "SETSHOWLOGIN":
      return action.payload;
    default:
      return state;
  }
};

module.exports = { showLoginReducer };
