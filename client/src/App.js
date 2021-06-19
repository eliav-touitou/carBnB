import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import AddNewCar from "./components/AddNewCar";
import SearchBar from "./components/SearchBar";
import Rental from "./components/Rental";
import Results from "./components/Results";
import { setAllCarsApi } from "./actions";
import { useDispatch } from "react-redux";
import CarDetails from "./components/CarDetails";

const axios = require("axios");
const apiCars = "https://vpic.nhtsa.dot.gov/api";

function App() {
  const dispatch = useDispatch();

  // state for filter, need to change to redux
  const [availableCarsNumberTwo, setAvailableCarsNumberTwo] = useState();

  useEffect(() => {
    axios
      .get(apiCars + "/vehicles/GetMakesForVehicleType/car?format=json")
      .then(({ data }) => {
        console.log(data);
        dispatch(setAllCarsApi(data.Results));
      });
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home setAvailableCarsNumberTwo={setAvailableCarsNumberTwo} />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/addnewcar">
            <AddNewCar />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/searchbar">
            <SearchBar setAvailableCarsNumberTwo={setAvailableCarsNumberTwo} />
          </Route>
          <Route exact path="/rental">
            <Rental />
          </Route>
          <Route exact path="/results">
            <Results
              availableCarsNumberTwo={availableCarsNumberTwo}
              setAvailableCarsNumberTwo={setAvailableCarsNumberTwo}
            />
          </Route>
          <Route exact path="/result/:resultId" component={CarDetails} />

          <Route path="/" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
