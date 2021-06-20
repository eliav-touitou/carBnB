const onLoginReducer = (state = false, action) => {
  switch (action.type) {
    case "LOGINPAGE":
      return action.payload;
    default:
      return state;
  }
};

module.exports = { onLoginReducer };
