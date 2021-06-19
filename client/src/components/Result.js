import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Result({ brand, passengers, carId, resultId }) {
  // Redux states
  const auth = useSelector((state) => state.auth);

  const saveToFavorite = async (carId) => {
    try {
      const result = await axios.post("/api/v1/favorite/add", {
        data: { carId: carId, userEmail: auth.user_email },
      });
      console.log(result);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="car-details">
      <Link to={`/result/${resultId}`}>
        <div className="car-brand">Brand: {brand}</div>
        {/* <div className="car-year">Year: {car.year}</div> */}
        {/* <div className="car-model">Model: {car.model}</div> */}
        {/* <div className="car-gear">Gear: {car.gear}</div> */}
        <div className="car-passengers">Passengers: {passengers}</div>
        {/* <div className="car-fuel">Fuel: {car.fuel}</div> */}
        <button onClick={() => saveToFavorite(carId)}>❤</button>
      </Link>
      <hr />
    </div>
  );
}
