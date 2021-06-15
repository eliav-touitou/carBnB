const carsReducer = (state = [], action) => {
  switch (action.type) {
    case "ALLCARS":
      return action.payload;
    default:
      return state;
  }
};

module.exports = { carsReducer };
