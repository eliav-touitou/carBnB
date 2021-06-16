import { combineReducers } from "redux";
import { loggedReducer } from "./isLogged";
import { carsReducer } from "./cars";
import { allCarsApiReducer } from "./carsApi";
import { allModelsApiReducer } from "./modelsApi";

const allReducers = combineReducers({
  isLogged: loggedReducer,
  allCars: carsReducer,
  allCarsApi: allCarsApiReducer,
  allModelsApi: allModelsApiReducer,
});

export default allReducers;
