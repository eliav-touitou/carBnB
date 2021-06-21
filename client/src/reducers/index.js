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
import { initialSearchReducer } from "./initialSearch";
import { onLoginReducer } from "./onLoginPage";
import { promptOrNormalReducer } from "./promptOrNormal";
import { rentalDetailsReducer } from "./rentalDetails";
import { notificationsReducer } from "./notifications";

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
  initialSearch: initialSearchReducer,
  isLoginPage: onLoginReducer,
  promptOrNormal: promptOrNormalReducer,
  rentalDetails: rentalDetailsReducer,
  notification: notificationsReducer,
});

export default allReducers;
