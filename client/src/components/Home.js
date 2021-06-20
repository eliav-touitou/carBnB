import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPromptOrNormal, setCars, setAuthOut } from "../actions";
import SearchBar from "./SearchBar";
import Avatar from "./Avatar";
const axios = require("axios");

export default function Home() {
  const dispatch = useDispatch();

  // Redux states
  const allCars = useSelector((state) => state.allCars);

  // Get all cars
  const getCars = async () => {
    try {
      const { data } = await axios.get("api/v1/cars/allcars");
      dispatch(setCars(data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  // Logout handler
  const logoutHandler = async () => {
    try {
      console.log(await axios.post("/api/v1/users/logout"));
      dispatch(setAuthOut());
    } catch (error) {
      console.log("error logout");
    }
  };

  const setNormal = () => {
    dispatch(setPromptOrNormal("normal"));
  };

  return (
    <div>
      <Avatar />
      <SearchBar />
      <button onClick={getCars}>Get cars</button>
      {allCars?.map((car, i) => (
        <div key={`car` + i}>
          <h3>{car.brand}</h3>
          <div>{car.model}</div>
          <div>{car.year}</div>
          <hr />
        </div>
      ))}

      <Link to="/register">
        <button onClick={setNormal}>register</button>
      </Link>
      <Link to="/login">
        <button onClick={setNormal}>login</button>
      </Link>
      <button onClick={logoutHandler}>logout</button>
    </div>
  );
}
