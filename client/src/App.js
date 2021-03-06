import "./App.css";
import React, { useEffect, useState } from "react";
import Home from "./components/Home";
import Register from "./components/Register";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import AddNewCar from "./components/AddNewCar";
import SearchBar from "./components/SearchBar";
import Results from "./components/Results";
import { useDispatch, useSelector } from "react-redux";
import CarDetails from "./components/CarDetails";
import OrderSummery from "./components/OrderSummery";
import MessageDetails from "./components/MessageDetails";
import Notifications from "./components/Notifications";
import MyOrders from "./components/MyOrders";
import OrderDetails from "./components/OrderDetails";
import { Badge } from "@material-ui/core";
import PromptLogin from "./components/PromptLogin";
import Avatar from "./components/Avatar";
import logo from "./photos/logo-black.png";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Snackbar from "@material-ui/core/Snackbar";
import MyFavorite from "./components/MyFavorite";
import CarDetailsFromFavorite from "./components/CarDetailsFromFavorite";
import Tops from "./components/Tops";
import CarsBySelection from "./components/TopCars";
import ResetPassword from "./components/ResetPassword";
import {
  setAllCarsApi,
  setAuthOut,
  setNotificationCounter,
  setNotifications,
  setShowLogin,
} from "./actions";
import {
  BrowserRouter,
  Route,
  Switch,
  NavLink,
  Redirect,
} from "react-router-dom";

const axios = require("axios");

function App() {
  const dispatch = useDispatch();

  // Global API URL.
  const apiCars = "https://vpic.nhtsa.dot.gov/api";

  // Redux state
  const notificationCounter = useSelector((state) => state.notificationCounter);
  const auth = useSelector((state) => state.auth);
  const showLogin = useSelector((state) => state.showLogin);
  const spinner = useSelector((state) => state.spinner);

  // Use state
  const [visibility, setVisibility] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [needToLogin, setNeedToLogin] = useState(false);

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

  const handleVisibility = () => {
    setVisibility((prev) => !prev);
    setAnchorEl(null);
  };

  useEffect(() => {
    let count = 0;
    if (auth) {
      axios
        .post("/api/v1/notification/messages", {
          data: { email: auth.user_email },
        })
        .then(({ data: messages }) => {
          messages.data?.forEach((message) => {
            if (message.read === false) {
              count++;
            }
          });
          dispatch(setNotificationCounter(count));
          dispatch(setNotifications(messages.data));
        })
        .catch((err) => {
          if (err.response.status === 403) {
            dispatch(setAuthOut());
            setNeedToLogin(true);
            setTimeout(() => {
              setNeedToLogin(false);
            }, 4500);
          }
        });
    }
  }, [[], auth, visibility]);

  return (
    <div className="App">
      <BrowserRouter>
        <NavLink className="navlink" id="navbar-logo" exact to="/">
          <img src={logo} alt="logo" />
        </NavLink>
        <NavLink
          className="navlink add-car-btn"
          activeStyle={{ color: "navy" }}
          to={auth && "/addnewcar"}
          onClick={() => {
            !auth && dispatch(setShowLogin(true));
          }}
        >
          Rent Your Car
        </NavLink>
        {auth ? (
          <div className="navlink messages">
            <Badge badgeContent={notificationCounter} color="secondary">
              <NotificationsIcon onClick={handleVisibility} />
              <div className={`tool-tip-text ${visibility}`}>
                <Notifications setVisibility={setVisibility} />
              </div>
            </Badge>
          </div>
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

        {needToLogin && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            open={true}
            message="your time expired, please login again"
            key={"top" + "center"}
          />
        )}

        <Avatar
          anchorEl={anchorEl}
          setAnchorEl={setAnchorEl}
          setVisibility={setVisibility}
        />
        {spinner && (
          <div className="spinner">
            <div className="sk-folding-cube">
              <div className="sk-cube1 sk-cube"></div>
              <div className="sk-cube2 sk-cube"></div>
              <div className="sk-cube4 sk-cube"></div>
              <div className="sk-cube3 sk-cube"></div>
            </div>
          </div>
        )}

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

          <Route exact path="/addnewcar">
            <AddNewCar />
          </Route>

          {auth && (
            <Route exact path="/profile">
              <Profile />
            </Route>
          )}
          <Route exact path="/searchbar">
            <SearchBar />
          </Route>
          <Route exact path="/results">
            <Results />
          </Route>
          <Route exact path="/summery">
            <OrderSummery />
          </Route>
          <Route exact path="/favorite">
            <MyFavorite />
          </Route>
          {auth && (
            <Route exact path="/notifications">
              <Notifications />
            </Route>
          )}
          <Route exact path="/result/:resultId" component={CarDetails} />
          <Route
            exact
            path="/favorite/:carId"
            component={CarDetailsFromFavorite}
          />
          <Route exact path="/message/:messageId" component={MessageDetails} />
          <Route exact path="/allmyorders/:type" component={MyOrders} />
          <Route exact path="/order/:orderId" component={OrderDetails} />
          <Route exact path="/top/:type" component={Tops} />
          <Route exact path="/resetpassword/:id" component={ResetPassword} />
          <Route
            exact
            path="/top/ownercars/:ownername"
            component={CarsBySelection}
          />
          <Route exact path="/top/city/:name" component={CarsBySelection} />
          <Route exact path="/top/car/:brand" component={CarsBySelection} />
          <Route path="/" component={NotFound} />
        </Switch>
        {needToLogin && <Redirect push to="/" />}
      </BrowserRouter>
    </div>
  );
}

export default App;
