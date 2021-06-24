const photosArrayReducer = (state = [], action) => {
  switch (action.type) {
    case "SETPHOTOSARRAY":
      return action.payload;
    default:
      return state;
  }
};

module.exports = { photosArrayReducer };
