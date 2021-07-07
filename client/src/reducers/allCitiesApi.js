const allCitiesApiReducer = (state = [], action) => {
  switch (action.type) {
    case "SETALLCITIESAPI":
      return action.payload;
    default:
      return state;
  }
};

module.exports = { allCitiesApiReducer };
