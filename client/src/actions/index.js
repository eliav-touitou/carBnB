// ACTION INCREMENT
export const increment = (number) => {
  return {
    type: "INCREMENT",
    payload: number,
  };
};

export const decrement = () => {
  return {
    type: "DECREMENT",
  };
};

export const logged = (isLogged) => {
  return {
    type: "LOGGED",
    payload: isLogged,
  };
};
