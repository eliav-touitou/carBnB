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

export const setAuth = (userDetails) => {
  return {
    type: "SIGN-IN",
    payload: userDetails,
  };
};

export const setAuthOut = () => {
  return {
    type: "LOG-OUT",
    payload: false,
  };
};

export const setAvailableCars = (availableCars) => {
  return {
    type: "SETAVAILABLE",
    payload: availableCars,
  };
};
