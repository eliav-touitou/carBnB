const carToRentalReducer = (state = {}, action) => {
  switch (action.type) {
    case "SETCARTORENTAL":
      return action.payload;
    default:
      return state;
  }
};

module.exports = { carToRentalReducer };
