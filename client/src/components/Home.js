import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCars, setAuthOut, setAuth } from "../actions";
import SearchBar from "./SearchBar";
import FilterBar from "./FilterBar";
import SideBar from "./SideBar";
import Avatar from "./Avatar";
const axios = require("axios");

export default function Home() {
  const dispatch = useDispatch();

  const allCars = useSelector((state) => state.allCars);

  useEffect(() => {
    axios
      .get("api/v1/users/checklogged")
      .then((result) => {
        if (result.status === 200) dispatch(setAuth(result.data.data));
      })
      .catch((err) => console.log(err.message));
  }, []);

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

  return (
    <div>
      <Avatar />
      <SearchBar />
      <button onClick={getCars}>Get cars</button>
      {allCars?.map((car, i) => (
        <div key={`car` + i}>
          {console.log(car)}
          <h3>{car.brand}</h3>
          <div>{car.model}</div>
          <div>{car.year}</div>
          <hr />
        </div>
      ))}

      <Link to="/register">
        <button>register</button>
      </Link>
      <Link to="/login">
        <button>login</button>
      </Link>
      <button onClick={logoutHandler}>logout</button>
      <SideBar />
    </div>
  );
}
