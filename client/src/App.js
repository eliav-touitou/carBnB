import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import CarDetails from "./components/CarDetails";
import { setAuth } from "./actions";

const axios = require("axios");

function App() {
  const dispatch = useDispatch();

  // Global API URL.
  const apiCars = "https://vpic.nhtsa.dot.gov/api";

  // Redux state
  const auth = useSelector((state) => state.auth);
  const isLoginPage = useSelector((state) => state.isLoginPage);

  // Check if user logged, if true update auth state.
  useEffect(() => {
    axios
      .get("api/v1/users/checklogged")
      .then((result) => {
        if (result.status === 200) dispatch(setAuth(result.data.data));
      })
      .catch((err) => console.log(err.message));
  }, []);

  // Get all cars brand from API.
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
        {!isLoginPage && (
          <nav className="nav-bar">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/searchbar">Search</NavLink>
            <NavLink to="/addnewcar">Add New Car</NavLink>
            {!auth && <NavLink to="/login">Login</NavLink>}
          </nav>
        )}
        <Switch>
          <Route exact path="/">
            <Home />
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
            <SearchBar />
          </Route>
          <Route exact path="/rental">
            <Rental />
          </Route>
          <Route exact path="/results">
            <Results />
          </Route>
          <Route exact path="/result/:resultId" component={CarDetails} />

          <Route path="/" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
