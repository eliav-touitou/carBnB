const priceFilterReducer = (state = [10, 65], action) => {
  switch (action.type) {
    case "SETPRICE":
      return action.payload;
    default:
      return state;
  }
};

module.exports = { priceFilterReducer };
