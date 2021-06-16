import { loggedReducer } from "./isLogged";
import { carsReducer } from "./cars";
import { allCarsApiReducer } from "./carsApi";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  isLogged: loggedReducer,
  allCars: carsReducer,
  allCarsApi: allCarsApiReducer,
});

export default allReducers;
