// ACTION INCREMENT
export const cars = (carsObj) => {
  return {
    type: "ALLCARS",
    payload: carsObj,
  };
};

export const logged = (isLogged) => {
  return {
    type: "ISLOGGED",
    payload: isLogged,
  };
};
