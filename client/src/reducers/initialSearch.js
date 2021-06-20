const initialSearchReducer = (state = {}, action) => {
  switch (action.type) {
    case "SETINITIALSEARCH":
      return action.payload;
    default:
      return state;
  }
};

module.exports = { initialSearchReducer };
