import React, { useEffect, useState } from "react";
import { setAvailableCars } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Result from "./Result";
import SideBar from "./SideBar";

export default function Results() {
  const dispatch = useDispatch();

  // Redux states
  const availableCars = useSelector((state) => state.availableCars);
  const filteredCars = useSelector((state) => state.filteredCars);
  return (
    <div>
      <h1>Results</h1>
      {filteredCars?.map((car, i) => (
        <Result
          key={`car-${i}`}
          resultId={i}
          brand={car.brand}
          passengers={car.passengers}
          carId={car.car_id}
        />
      ))}
      {/* {availableCars.length === 0 ? <Redirect to="/" /> : null} */}
      <SideBar />
    </div>
  );
}
