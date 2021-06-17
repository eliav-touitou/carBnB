const yearFilterReducer = (state = [1990, 2010], action) => {
  switch (action.type) {
    case "SETYEARS":
      return action.payload;
    default:
      return state;
  }
};

module.exports = { yearFilterReducer };
