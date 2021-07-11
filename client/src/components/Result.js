import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setShowLogin } from "../actions";
import PromptLogin from "./PromptLogin";
import defaultPhoto from "../photos/no-car-photo.png";
import CarGallery from "./CarGallery";
import { Icon, InlineIcon } from "@iconify/react";
import seatPassenger from "@iconify-icons/mdi/seat-passenger";
export default function Result({ car, resultId }) {
  const dispatch = useDispatch();

  // Redux states
  const auth = useSelector((state) => state.auth);
  const showLogin = useSelector((state) => state.showLogin);
  const availableCars = useSelector((state) => state.availableCars);

  // Use states
  const [carPhoto, setCarPhoto] = useState();
  const [photosArray, setPhotosArray] = useState([]);
  const [heartButton, setHeartButton] = useState("far fa-heart");

  useEffect(() => {
    const photosData = ["Photo", ["car_id"], [car.car_id]];
    axios
      .post("/api/v1/search/getitem", { data: photosData })
      .then(({ data }) => {
        setPhotosArray(data.data);
      })
      .catch((err) => console.log(err.message));
  }, [[], availableCars]);

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
    <div className="result">
      <button id="love" onClick={() => saveToFavorite(car.car_id)}>
        <i className={heartButton}></i>
      </button>
      <div className="ft-recipe__thumb">
        {photosArray.length > 0 ? (
          <CarGallery photosArray={photosArray} location={"result"} />
        ) : (
          <img
            alt="car-photo"
            className="no-photos-replacement"
            src={defaultPhoto}
          />
        )}
      </div>
      <div className="ft-recipe__content">
        <header className="content__header">
          <div className="row-wrapper">
            <h2 className="recipe-title">
              {car.brand}, {car.model}
            </h2>
            <div className="user-rating" />
          </div>
          <ul className="recipe-details">
            <li className="recipe-details-item time">
              <i className="fas fa-tools"></i>
              <span className="value">{car.year}</span>
              <span className="title">Manufacture year</span>
            </li>
            <li className="recipe-details-item ingredients">
              <i className="fas fa-dollar-sign ion"></i>
              <span className="value">{car.price_per_day}</span>
              <span className="title">Per day</span>
            </li>
            <li className="recipe-details-item servings">
              <Icon icon={seatPassenger} className="ion" />
              <span className="value">{car.passengers}</span>
              <span className="title">Number of seats</span>
            </li>
          </ul>
        </header>
        <div className="description">
          <div className="rating-result">
            <i className="fas fa-star"></i>{" "}
            <span className="owner-rating-results">
              {" "}
              {Number(car.owner_rating).toFixed(1)} / 5
            </span>{" "}
            |
            <span className="owner-rating-reviews">
              {" "}
              {car.number_of_votes} reviews{" "}
            </span>{" "}
          </div>
        </div>
        <footer className="content__footer">
          <Link to={`/result/${resultId}`}>
            <button>Book this car</button>
          </Link>
        </footer>
      </div>
    </div>
  );
}
