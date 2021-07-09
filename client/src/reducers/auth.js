export const authReducer = (state = false, action) => {
  switch (action.type) {
    case "SIGN-IN":
      return action.payload;
    case "LOG-OUT":
      return false;
    case "SETAUTHLICENSE":
      return { ...state, license: action.payload };
    default:
      return state;
  }
};
