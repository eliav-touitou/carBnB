const filteredCarsReducer = (state = [], action) => {
  switch (action.type) {
    case "SETFILTEREDCARS":
      return action.payload;
    default:
      return state;
  }
};

module.exports = { filteredCarsReducer };
