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

export const setFilterYears = (arr) => {
  return {
    type: "SETYEARS",
    payload: arr,
  };
};

export const setFilterPrice = (arr) => {
  return {
    type: "SETPRICE",
    payload: arr,
  };
};

export const setFilterRate = (arr) => {
  return {
    type: "SETFILTERRATE",
    payload: arr,
  };
};

export const setFilteredCars = (arr) => {
  return {
    type: "SETFILTEREDCARS",
    payload: arr,
  };
};
export const setInitialSearch = (obj) => {
  return {
    type: "SETINITIALSEARCH",
    payload: obj,
  };
};
export const setOnLoginPage = (bool) => {
  return {
    type: "LOGINPAGE",
    payload: bool,
  };
};

export const setPromptOrNormal = (str) => {
  return {
    type: "SETPROMPTORNORMAL",
    payload: str,
  };
};

export const setRentalDetails = (str) => {
  return {
    type: "SETRENTALDETAILS",
    payload: str,
  };
};

export const setNotifications = (messages) => {
  return {
    type: "SETNOTIFICATIONS",
    payload: messages,
  };
};

export const setNotFoundMessage = (messages) => {
  return {
    type: "SETNOTFOUNDMESSAGE",
    payload: messages,
  };
};

export const setNotificationCounter = (number) => {
  return {
    type: "SETNOTIFICATIONCOUNTER",
    payload: number,
  };
};
export const setPhotosArray = (arr) => {
  return {
    type: "SETPHOTOSARRAY",
    payload: arr,
  };
};
