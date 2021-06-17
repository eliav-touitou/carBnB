export const authReducer = (state = false, action) => {
  switch (action.type) {
    case "SIGN-IN":
      return action.payload;
    case "LOG-OUT":
      return false;
    default:
      return state;
  }
};
