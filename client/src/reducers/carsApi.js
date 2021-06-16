const allCarsApiReducer = (state = [], action) => {
  switch (action.type) {
    case "ALLCARSAPI":
      return action.payload;
    default:
      return state;
  }
};

module.exports = { allCarsApiReducer };
