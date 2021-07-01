import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setShowLogin } from "../actions";
import PromptLogin from "./PromptLogin";
import defaultPhoto from "../photos/no-car-photo.png";

export default function Result({ model, brand, passengers, carId, resultId }) {
  const dispatch = useDispatch();

  // Redux states
  const auth = useSelector((state) => state.auth);
  const showLogin = useSelector((state) => state.showLogin);
  const [carPhoto, setCarPhoto] = useState();

  useEffect(() => {
    axios
      .post("/api/v1/photos/uniquephoto", { carId })
      .then(({ data: photo }) => {
        console.log(photo);
        setCarPhoto(photo.data.file);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (auth) dispatch(setShowLogin(false));
  }, [auth]);

  const saveToFavorite = async (carId) => {
    try {
      if (auth) {
        const result = await axios.post("/api/v1/favorite/add", {
          data: { carId: carId, userEmail: auth.user_email },
        });
        console.log(result);
      } else {
        // need to prompt login promp component
        dispatch(setShowLogin(true));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="car-details">
      <div className="first-details">
        {carPhoto ? (
          <img
            alt="car-photo"
            src={`data:image/jpeg;base64,${carPhoto}`}
            height={100}
          />
        ) : (
          <img alt="car-photo" src={defaultPhoto} height={100} />
        )}
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
