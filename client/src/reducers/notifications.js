const notificationsReducer = (state = [], action) => {
  switch (action.type) {
    case "SETNOTIFICATIONS":
      return action.payload;
    default:
      return state;
  }
};

module.exports = { notificationsReducer };
