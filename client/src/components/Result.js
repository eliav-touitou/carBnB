import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PromptLogin from "./PromptLogin";

export default function Result({ model, brand, passengers, carId, resultId }) {
  // Redux states
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth) setShowLogin(false);
  }, [auth]);

  // Use states
  const [showLogin, setShowLogin] = useState(false);

  const saveToFavorite = async (carId) => {
    try {
      if (auth) {
        const result = await axios.post("/api/v1/favorite/add", {
          data: { carId: carId, userEmail: auth.user_email },
        });
        console.log(result);
      } else {
        // need to prompt login promp component
        setShowLogin(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="car-details">
      <div className="first-details">
        {showLogin && <PromptLogin />}
        <div className="car-brand">Brand: {brand}</div>
        <div className="car-passengers">Model: {model}</div>
        <div className="car-passengers">Passengers: {passengers}</div>

        <button onClick={() => saveToFavorite(carId)}>❤</button>
        <Link to={`/result/${resultId}`}>
          <button>Read More</button>
        </Link>
      </div>
      {/* <hr /> */}
    </div>
  );
}
