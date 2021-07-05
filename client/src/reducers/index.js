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
import { notFoundMessageReducer } from "./notFoundMessage";
import { notificationCounterReducer } from "./notificationCounter";
import { photosArrayReducer } from "./photosArray";
import { showLoginReducer } from "./showLogin";
import { carToRentalReducer } from "./carToRental";

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
  notifications: notificationsReducer,
  notFoundMessage: notFoundMessageReducer,
  notificationCounter: notificationCounterReducer,
  photosArray: photosArrayReducer,
  showLogin: showLoginReducer,
  carToRental: carToRentalReducer,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === "LOG-OUT") {
    window.localStorage.removeItem("persist:root");
    state = undefined;
  }

  return allReducers(state, action);
};

export default rootReducer;
