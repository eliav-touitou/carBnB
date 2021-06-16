import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logged, cars } from "../actions";
import SearchBar from "./SearchBar";
const axios = require("axios");

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get("api/v1/users/checklogged").then((result) => {
      if (result.status === 200) dispatch(logged(true));
    });
  }, []);

  // Get all cars
  const getCars = async () => {
    try {
      const { data } = await axios.get("api/v1/cars/allcars");
      dispatch(cars(data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  // Logout handler
  const logoutHandler = async () => {
    try {
      await axios.post("/api/v1/users/logout");
    } catch (error) {
      console.log("error logout");
    }
  };

  const isLogged = useSelector((state) => state.isLogged);
  const allCars = useSelector((state) => state.allCars);

  return (
    <div>
      <SearchBar />
      <p>logged {String(isLogged)}</p>
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
    </div>
  );
}
