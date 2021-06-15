import { loggedReducer } from "./isLogged";
import { carsReducer } from "./cars";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  isLogged: loggedReducer,
  allCars: carsReducer,
});

export default allReducers;
