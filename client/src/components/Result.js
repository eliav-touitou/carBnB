import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Result({ brand, passengers, carId, resultId }) {
  // Redux states
  const auth = useSelector((state) => state.auth);

  const saveToFavorite = async (carId) => {
    try {
      if (auth) {
        const result = await axios.post("/api/v1/favorite/add", {
          data: { carId: carId, userEmail: auth.user_email },
        });
        console.log(result);
      } else {
        // need to prompt login promp component
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="car-details">
      <Link to={`/result/${resultId}`}>
        <div className="car-brand">Brand: {brand}</div>
        <div className="car-passengers">Passengers: {passengers}</div>
        <button onClick={() => saveToFavorite(carId)}>❤</button>
      </Link>
      <hr />
    </div>
  );
}
