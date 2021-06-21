const rentalDetailsReducer = (state = 0, action) => {
  switch (action.type) {
    case "SETRENTALDETAILS":
      return action.payload;
    default:
      return state;
  }
};

module.exports = { rentalDetailsReducer };
