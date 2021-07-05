import { Snackbar } from "@material-ui/core";
import React, { useState } from "react";
import { DateRangePicker } from "react-dates";
import { Redirect } from "react-router-dom";

export default function FavoriteDetails({ car }) {
  // Use States
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [dates, setDates] = useState();
  const [redirect, setRedirect] = useState();

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
    <div className="car-favorite-outer-container">
      <div className="car-details">
        <div className="car-details-upper">
          <div>Brand: {car.brand}</div>
          <div>Model: {car.model}</div>
          <div>Year: {car.year}</div>
          <div>Price per day: {car.price_per_day}</div>
        </div>
        <div className="car-details-lower">
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
      </div>

      <button onClick={checkDatesValue}>Order this car</button>
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
          message={"must choose dates"}
          key={"top" + "center"}
        />
      )}
    </div>
  );
}
