export const availableCarsReducer = (state = [], action) => {
  switch (action.type) {
    case "SETAVAILABLE":
      return action.payload;
    default:
      return state;
  }
};
