import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logged, cars } from "../actions";

const axios = require("axios");

export default function Home() {
  // const [cars, setCars] = useState();
  const owner = useRef();
  const brand = useRef();
  const model = useRef();
  const year = useRef();
  const fuel = useRef();
  const pricePerDay = useRef();
  const pricePerWeek = useRef();
  const pricePerMonth = useRef();
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

  // Upload new car to database
  const uploadCar = async () => {
    const newCar = {
      ownerName: owner.current.value,
      brand: brand.current.value,
      model: model.current.value,
      year: year.current.value,
      fuel: fuel.current.value,
      pricePerDay: pricePerDay.current.value,
      pricePerWeek: pricePerWeek.current.value,
      pricePerMonth: pricePerMonth.current.value,
    };
    try {
      await axios.post("api/v1/cars/upload", { newCar: newCar });
      console.log("Car Saved!");
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
      <div>
        <input ref={owner} placeholder="Enter Name"></input>
        <input ref={brand} placeholder="Enter Car's Brand"></input>
        <input ref={model} placeholder="Enter Car's model"></input>
        <input ref={year} placeholder="Enter Car's manufacture year"></input>
        <input ref={fuel} placeholder="Enter Car's gas type"></input>
        <input
          ref={pricePerDay}
          placeholder="Enter wanted tariff per day"
        ></input>
        <input
          ref={pricePerWeek}
          placeholder="Enter wanted tariff per week"
        ></input>
        <input
          ref={pricePerMonth}
          placeholder="Enter wanted tariff per Month"
        ></input>
        <div>
          <button onClick={uploadCar}>Upload Car</button>
        </div>

        <Link to="/register">
          <button>register</button>
        </Link>
        <Link to="/login">
          <button>login</button>
        </Link>
        <button onClick={logoutHandler}>logout</button>
      </div>
    </div>
  );
}
