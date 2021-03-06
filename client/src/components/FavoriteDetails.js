import { Snackbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-dates";
import { Redirect } from "react-router-dom";
import axios from "axios";
import CarGallery from "./CarGallery";
import defaultPhoto from "../photos/no-car-photo.png";
import { Icon } from "@iconify/react";
import seatPassenger from "@iconify-icons/mdi/seat-passenger";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "../react_dates_overrides.css";
import { setSpinner } from "../actions";
import { useDispatch } from "react-redux";

export default function FavoriteDetails({ car }) {
  const dispatch = useDispatch();

  // Use States
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [dates, setDates] = useState();
  const [redirect, setRedirect] = useState();
  const [photosArray, setPhotosArray] = useState([]);

  useEffect(() => {
    dispatch(setSpinner(true));

    const photosData = ["Photo", ["car_id"], [car.car_id]];
    axios
      .post("/api/v1/search/getitem", { data: photosData })
      .then(({ data }) => {
        setPhotosArray(data.data);
        console.log(data.data);
        dispatch(setSpinner(false));
      })
      .catch((err) => {
        console.log(err.message);
        dispatch(setSpinner(false));
      });
  }, []);

  const checkDatesValue = async () => {
    if (dates) {
      setRedirect(true);
    } else {
      setRedirect("snack");
      setTimeout(() => {
        setRedirect();
      }, 3000);
    }
  };

  // Handle dates on changes
  const handleDatesChange = ({ startDate, endDate }) => {
    const newStart = new Date(startDate);
    const newEnd = new Date(endDate);
    setStartDate(startDate);
    setEndDate(endDate);
    const tempDates = { startDate: newStart, endDate: newEnd };
    setDates(tempDates);
  };

  return (
    <div className="ft-recipe">
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
          <DateRangePicker
            startDate={startDate}
            startDatePlaceholderText="Start date:"
            startDateId="tata-start-date"
            endDate={endDate}
            endDatePlaceholderText="End date:"
            endDateId="tata-end-date"
            onDatesChange={handleDatesChange}
            focusedInput={focusedInput}
            onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
            small={true}
          />
        </div>
        <footer className="content__footer">
          <button onClick={checkDatesValue}>Book this car</button>
        </footer>
      </div>
      {redirect === true && (
        <Redirect
          push
          to={{
            pathname: `/favorite/${car.car_id}`,
            state: { car, dates },
          }}
        />
      )}
      {redirect === "snack" && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={true}
          message={"You must choose dates"}
          key={"top" + "center"}
        />
      )}
    </div>
  );
}
