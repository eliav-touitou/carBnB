import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter, Route, Switch, NavLink, Link } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import AddNewCar from "./components/AddNewCar";
import SearchBar from "./components/SearchBar";
import Rental from "./components/Rental";
import Results from "./components/Results";
import { setAllCarsApi, setAuthOut, setShowLogin } from "./actions";
import { useDispatch, useSelector } from "react-redux";
import CarDetails from "./components/CarDetails";
import OrderSummery from "./components/OrderSummery";
import MessageDetails from "./components/MessageDetails";
import Notifications from "./components/Notifications";
import MyOrders from "./components/MyOrders";
import OrderDetails from "./components/OrderDetails";
import { Badge } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import PromptLogin from "./components/PromptLogin";
import Avatar from "./components/Avatar";
import logo from "./photos/carBnB-logo.png";

const axios = require("axios");

function App() {
  const dispatch = useDispatch();

  // Global API URL.
  const apiCars = "https://vpic.nhtsa.dot.gov/api";

  // Redux state
  const notificationCounter = useSelector((state) => state.notificationCounter);
  const auth = useSelector((state) => state.auth);
  const showLogin = useSelector((state) => state.showLogin);

  // Get all cars brand from API.
  useEffect(() => {
    dispatch(setShowLogin(false));
    axios
      .get(apiCars + "/vehicles/GetMakesForVehicleType/car?format=json")
      .then(({ data }) => {
        console.log(data);
        dispatch(setAllCarsApi(data.Results));
      });
  }, []);

  // Logout handler
  const logoutHandler = async () => {
    try {
      await axios.post("/api/v1/users/logout");
      dispatch(setAuthOut());

      console.log("Success logout");
    } catch (error) {
      console.log("Failed logout");
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <NavLink className="navlink" id="navbar-logo" exact to="/">
          <img src={logo} alt="logo" />
        </NavLink>
        <NavLink
          className="navlink add-car-btn"
          activeStyle={{ color: "navy" }}
          to="/addnewcar"
        >
          Become a host
        </NavLink>
        {auth ? (
          <NavLink
            className="navlink messages"
            activeStyle={{ color: "navy" }}
            to="/notifications"
          >
            <Badge badgeContent={notificationCounter} color="primary">
              <MailIcon />
            </Badge>
          </NavLink>
        ) : (
          <div
            className="navlink login-btn"
            onClick={() => {
              dispatch(setShowLogin(true));
            }}
          >
            Login
          </div>
        )}
        {/* {!auth && (
          <div
            className="navlink"
            onClick={() => {
              dispatch(setShowLogin(true));
            }}
          >
            Login
          </div>
        )} */}

        <Avatar />

        {showLogin && <PromptLogin />}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <PromptLogin />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          {auth && (
            <Route exact path="/addnewcar">
              <AddNewCar />
            </Route>
          )}
          {auth && (
            <Route exact path="/profile">
              <Profile />
            </Route>
          )}
          <Route exact path="/searchbar">
            <SearchBar />
          </Route>
          <Route exact path="/rental">
            <Rental />
          </Route>
          <Route exact path="/results">
            <Results />
          </Route>
          <Route exact path="/summery">
            <OrderSummery />
          </Route>
          {auth && (
            <Route exact path="/notifications">
              <Notifications />
            </Route>
          )}
          <Route exact path="/result/:resultId" component={CarDetails} />
          <Route exact path="/message/:messageId" component={MessageDetails} />
          <Route exact path="/allmyorders/:type" component={MyOrders} />
          <Route exact path="/order/:orderId" component={OrderDetails} />

          <Route path="/" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
