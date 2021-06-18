import React, { useEffect } from "react";
import { setAvailableCars } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Result from "./Result";

export default function Results() {
  const dispatch = useDispatch();
  const availableCars = useSelector((state) => state.availableCars);

  return (
    <div>
      <h1>Results</h1>
      {availableCars.map((car, i) => (
        <Result
          key={`car-${i}`}
          resultId={i}
          brand={car.brand}
          passengers={car.passengers}
          carId={car.car_id}
        />
      ))}
      {/* {availableCars.length === 0 ? <Redirect to="/" /> : null} */}
    </div>
  );
}
