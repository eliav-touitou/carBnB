// ACTION INCREMENT
export const setCars = (carsObj) => {
  return {
    type: "ALLCARS",
    payload: carsObj,
  };
};
export const setAllCarsApi = (dataApi) => {
  return {
    type: "ALLCARSAPI",
    payload: dataApi,
  };
};
export const setAllModelsApi = (dataApi) => {
  return {
    type: "ALLMODELSAPI",
    payload: dataApi,
  };
};

export const setLogged = (isLogged) => {
  return {
    type: "ISLOGGED",
    payload: isLogged,
  };
};
