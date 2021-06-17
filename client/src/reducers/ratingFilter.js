const ratingFilterReducer = (state = 0, action) => {
  switch (action.type) {
    case "SETFILTERRATE":
      return action.payload;
    default:
      return state;
  }
};

module.exports = { ratingFilterReducer };
