import { Snackbar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { DateRangePicker } from "react-dates";
import { Redirect } from "react-router-dom";
import axios from "axios";
import CarGallery from "./CarGallery";
import defaultPhoto from "../photos/no-car-photo.png";

export default function FavoriteDetails({ car }) {
  // Use States
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [dates, setDates] = useState();
  const [redirect, setRedirect] = useState();
  const [photosArray, setPhotosArray] = useState([]);

  useEffect(() => {
    console.log(car);

    const photosData = ["Photo", ["car_id"], [car.car_id]];
    axios
      .post("/api/v1/search/getitem", { data: photosData })
      .then(({ data }) => {
        setPhotosArray(data.data);
        console.log(data.data);
      })
      .catch((err) => console.log(err.message));
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
    <div className="car-details">
      <div className="first-details">
        {photosArray.length > 0 ? (
          <CarGallery photosArray={photosArray} location={"result"} />
        ) : (
          <img alt="car-photo" src={defaultPhoto} />
        )}
        <div className="data">
          <div>Brand: {car.brand}</div>
          <div>Model: {car.model}</div>
          <div>Year: {car.year}</div>
          <div>Price per day: {car.price_per_day}</div>
        </div>
        <div className="buttons">
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
          <button onClick={checkDatesValue} className="login-form-button">
            Book on this dates
          </button>
        </div>
      </div>
      {/* <hr /> */}
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
