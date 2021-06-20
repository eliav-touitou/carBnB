import { combineReducers } from "redux";
import { carsReducer } from "./cars";
import { allCarsApiReducer } from "./carsApi";
import { authReducer } from "./auth";
import { availableCarsReducer } from "./availableCars";
import { allModelsApiReducer } from "./modelsApi";
import { yearFilterReducer } from "./yearsFilter";
import { priceFilterReducer } from "./priceFilter";
import { ratingFilterReducer } from "./ratingFilter";
import { filteredCarsReducer } from "./filteredCars";

const allReducers = combineReducers({
  allCars: carsReducer,
  allCarsApi: allCarsApiReducer,
  allModelsApi: allModelsApiReducer,
  auth: authReducer,
  availableCars: availableCarsReducer,
  yearsFilter: yearFilterReducer,
  priceFilter: priceFilterReducer,
  ratingFilter: ratingFilterReducer,
  filteredCars: filteredCarsReducer,
});

export default allReducers;
