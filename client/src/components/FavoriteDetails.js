import axios from "axios";
import React, { useState } from "react";
import { DateRangePicker } from "react-dates";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { setCarToRental, setRentalDetails } from "../actions";
import Snackbar from "@material-ui/core/Snackbar";

export default function FavoriteDetails({ car }) {
  const dispatch = useDispatch();

  // Redux states
  const auth = useSelector((state) => state.auth);

  // Use States
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [isAvailable, setIsAvailable] = useState();
  const [redirect, setRedirect] = useState("/favorite");
  const [filledDates, setFilledDates] = useState(false);

  const CheckAvailability = async () => {
    if (startDate && endDate) {
      try {
        const { data: isAvailable } = await axios.post(
          "/api/v1/favorite/checkavailability",
          {
            carId: car.car_id,
            startDate,
            endDate,
          }
        );
        setIsAvailable(isAvailable);
      } catch (err) {
        console.log(err);
      }
    } else {
      setFilledDates(true);
      setTimeout(() => {
        setFilledDates(false);
      }, 4500);
    }
  };

  // Handle dates on changes
  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };

  // Function for calculate price for rental
  const calculateDiscount = () => {
    const pricePerDay = car.price_per_day;
    const discountAboveWeek = car.discount_for_week;
    const discountAboveMonth = car.discount_for_month;
    const numberOfDaysToRent = getNumberOfRentalDays();
    let newPrice = 0;

    if (numberOfDaysToRent < 7) {
      newPrice = pricePerDay * numberOfDaysToRent;
      return newPrice;
    }

    if (numberOfDaysToRent >= 30) {
      const percent = discountAboveMonth.slice(0, -1);
      newPrice =
        (pricePerDay - (percent / 100) * pricePerDay) * numberOfDaysToRent;
      return newPrice;
    }
    if (numberOfDaysToRent >= 7 && numberOfDaysToRent < 30) {
      const percent = discountAboveWeek.slice(0, -1);
      newPrice =
        (pricePerDay - (percent / 100) * pricePerDay) * numberOfDaysToRent;
      return newPrice;
    }
  };

  // Function for get numbers of days rental
  const getNumberOfRentalDays = () => {
    const numberOfDaysToRent = Math.round(
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
    );
    return numberOfDaysToRent;
  };

  // Order new car
  const makeOrder = async () => {
    try {
      car.carId = car.car_id;
      car.startDate = startDate;
      car.endDate = endDate;
      car.renterEmail = auth.user_email;
      car.ownerEmail = car.owner_email;
      car.totalPrice = Number(calculateDiscount());
      const { data: rental } = await axios.post("/api/v1/rentals/new", {
        data: { rentalDetails: car, userDetails: auth },
      });

      // If order succeed redirect to summery

      dispatch(setRentalDetails(rental.data));
      dispatch(setCarToRental(car));
      setRedirect("/summery");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="car-details">
        <div>{car.brand}</div>
        <div>{car.model}</div>
        <div>{car.year}</div>
        <div>{car.price_per_day}</div>
      </div>
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
      <button onClick={CheckAvailability}>Check availability</button>
      {isAvailable && (
        <div>
          <p>Car is available to orders in those dates</p>
          <button onClick={makeOrder}>Order</button>
        </div>
      )}
      {filledDates && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={true}
          message="you must pick dates first"
          key={"top" + "center"}
        />
      )}
      <Redirect push to={redirect} />
    </div>
  );
}
