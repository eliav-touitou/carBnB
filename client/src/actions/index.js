// ACTION INCREMENT
export const allCars = (carsObj) => {
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
