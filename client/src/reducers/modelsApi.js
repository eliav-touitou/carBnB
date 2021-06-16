const allModelsApiReducer = (state = [], action) => {
  switch (action.type) {
    case "ALLMODELSAPI":
      return action.payload;
    default:
      return state;
  }
};

module.exports = { allModelsApiReducer };
