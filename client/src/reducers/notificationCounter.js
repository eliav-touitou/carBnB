const notificationCounterReducer = (state = null, action) => {
  switch (action.type) {
    case "SETNOTIFICATIONCOUNTER":
      return action.payload;
    default:
      return state;
  }
};

module.exports = { notificationCounterReducer };
