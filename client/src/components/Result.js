import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setShowLogin } from "../actions";
import PromptLogin from "./PromptLogin";
import defaultPhoto from "../photos/no-car-photo.png";
import CarGallery from "./CarGallery";

export default function Result({ model, brand, passengers, carId, resultId }) {
  const dispatch = useDispatch();

  // Redux states
  const auth = useSelector((state) => state.auth);
  const showLogin = useSelector((state) => state.showLogin);
  const [carPhoto, setCarPhoto] = useState();
  const [photosArray, setPhotosArray] = useState([]);
  const [heartButton, setHeartButton] = useState("far fa-heart");

  // useEffect(() => {
  //   axios
  //     .post("/api/v1/photos/uniquephoto", { carId })
  //     .then(({ data: photo }) => {
  //       setCarPhoto(photo.data?.file);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [carId]);

  useEffect(() => {
    const photosData = ["Photo", ["car_id"], [carId]];
    axios
      .post("/api/v1/search/getitem", { data: photosData })
      .then(({ data }) => {
        setPhotosArray(data.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    if (auth) dispatch(setShowLogin(false));
  }, [auth]);

  const saveToFavorite = async (carId) => {
    if (heartButton === "far fa-heart") {
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
      setHeartButton("fas fa-heart");
    } else {
      try {
        if (auth) {
          const result = await axios.post("/api/v1/favorite/remove", {
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
      setHeartButton("far fa-heart");
    }
  };

  return (
    <div className="car-details">
      <div className="first-details">
        {photosArray.length > 0 ? (
          <CarGallery photosArray={photosArray} location={"result"} />
        ) : (
          <img alt="car-photo" src={defaultPhoto} height={100} />
        )}
        <div className="data">
          <div className="car-brand">Brand: {brand}</div>
          <div className="car-passengers">Model: {model}</div>
          <div className="car-passengers">Passengers: {passengers}</div>
        </div>
        <div className="buttons">
          <button onClick={() => saveToFavorite(carId)}>
            <i class={heartButton}></i>
          </button>
          <Link to={`/result/${resultId}`}>
            <button>➡</button>
          </Link>
        </div>
      </div>
      {/* <hr /> */}
    </div>
  );
}
