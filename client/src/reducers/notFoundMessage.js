const notFoundMessageReducer = (state = null, action) => {
  switch (action.type) {
    case "SETNOTFOUNDMESSAGE":
      return action.payload;
    default:
      return state;
  }
};

module.exports = { notFoundMessageReducer };
