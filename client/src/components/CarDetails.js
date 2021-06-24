import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { setPhotosArray } from "../actions";

import {
  setRentalDetails,
  setAvailableCars,
  setFilteredCars,
  setInitialSearch,
  setNotFoundMessage,
} from "../actions";
import PromptLogin from "./PromptLogin";

export default function CarDetails() {
  const dispatch = useDispatch();
  const { resultId } = useParams();

  //bringing the photos of the corresponding car, and emptying it on component down
  useEffect(() => {
    const photosData = ["Photo", ["car_id"], [availableCars[resultId].car_id]];
    axios
      .post("/api/v1/search/getitem", { data: photosData })
      .then(({ data }) => {
        dispatch(setPhotosArray(data.data));
      })
      .catch((err) => console.log(err.message));
    return () => {
      dispatch(setPhotosArray([]));
    };
  }, []);

  // Use states
  const [redirect, setRedirect] = useState(`/result/${resultId}`);
  const [showLogin, setShowLogin] = useState(false);

  // Redux States
  const availableCars = useSelector((state) => state.availableCars);
  const initialSearch = useSelector((state) => state.initialSearch);
  const photosArray = useSelector((state) => state.photosArray);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth) setShowLogin(false);
  }, [auth]);

  // Handle with difference cases
  const resetAvailableCars = async () => {
    try {
      const { data: availableCars } = await axios.post(
        "api/v1/search/initial",
        { data: initialSearch }
      );

      // If still there are available Cars, redirect to results
      dispatch(setAvailableCars(availableCars.data));
      dispatch(setFilteredCars(availableCars.data));
      setRedirect("/results");
    } catch (err) {
      // If still there no available Cars, redirect to home
      if (err.response.status === 404) {
        setRedirect("/");
        dispatch(setAvailableCars([]));
        dispatch(setFilteredCars([]));
        dispatch(setInitialSearch([]));
      }
      console.log(err);
    }
  };

  // Send new rental to save
  const rentalCar = async () => {
    const data = {
      carId: availableCars[resultId].car_id,
      ownerEmail: availableCars[resultId].owner_email,
      renterEmail: auth.user_email,
      startDate: initialSearch.startDate,
      endDate: initialSearch.endDate,
      totalPrice: calculateDiscount().price,
    };
    try {
      if (auth) {
        const rental = await axios.post("/api/v1/rentals/new", {
          data: data,
        });

        // If order succeed redirect to summery
        if (rental.status === 201) {
          dispatch(setRentalDetails(rental.data.data));
          setRedirect("/summery");
        }
      } else {
        // need to prompt login component
        setShowLogin(true);
        console.log("must log in first!");
      }
    } catch (error) {
      // If in the middle of the order, someone else took this car
      if (error.response.status === 400) {
        dispatch(setNotFoundMessage(error.response.data.message));
        await resetAvailableCars();
      }
      console.log(error);
    }
  };

  // Function for get numbers of days rental
  const getNumberOfRentalDays = () => {
    const numberOfDaysToRent = Math.round(
      (new Date(initialSearch.endDate) - new Date(initialSearch.startDate)) /
        (1000 * 60 * 60 * 24)
    );
    return numberOfDaysToRent;
  };

  // Function for calculate price for rental
  const calculateDiscount = () => {
    const pricePerDay = availableCars[resultId].price_per_day;
    const discountAboveWeek = availableCars[resultId].discount_for_week;
    const discountAboveMonth = availableCars[resultId].discount_for_month;
    const numberOfDaysToRent = getNumberOfRentalDays();
    let newPrice = 0;

    if (numberOfDaysToRent < 7) {
      newPrice = pricePerDay * numberOfDaysToRent;
      return { price: newPrice };
    }

    if (numberOfDaysToRent >= 30) {
      const percent = discountAboveMonth.slice(0, -1);
      newPrice =
        (pricePerDay - (percent / 100) * pricePerDay) * numberOfDaysToRent;
      return { price: newPrice, percent: `${percent}%`, days: "month" };
    }
    if (numberOfDaysToRent >= 7) {
      const percent = discountAboveWeek.slice(0, -1);
      newPrice =
        (pricePerDay - (percent / 100) * pricePerDay) * numberOfDaysToRent;
      return { price: newPrice, percent: `${percent}%`, days: "week" };
    }
  };

  return (
    <div>
      {showLogin && <PromptLogin />}

      <p>מלא פרטים על הרכב 😃😃🍏🍏</p>
      <a href={`mailto:${availableCars[resultId].owner_email}`}>owner email</a>
      <p>barnd: {availableCars[resultId].brand} </p>
      <p>model: {availableCars[resultId].model} </p>
      <p>year: {availableCars[resultId].year} </p>
      <p>fuel: {availableCars[resultId].fuel} </p>
      <p>gear: {availableCars[resultId].gear} </p>
      <p>passengers: {availableCars[resultId].passengers} </p>
      <p>
        {`initial price: ${getNumberOfRentalDays()} x
        ${availableCars[resultId].price_per_day} =
        ${getNumberOfRentalDays() * availableCars[resultId].price_per_day}`}
      </p>
      {calculateDiscount().percent && (
        <p>{`discount for order over ${calculateDiscount().days}: ${
          calculateDiscount().percent
        } , - ${
          getNumberOfRentalDays() * availableCars[resultId].price_per_day -
          calculateDiscount().price
        } $`}</p>
      )}
      <p>{`Total price: ${calculateDiscount().price}`}</p>
      <div className="gallery">
        {photosArray?.map((photo, i) => (
          <img
            alt="license"
            key={`photo-${i}`}
            src={`data:image/jpeg;base64,${photo.file}`}
            height={100}
          />
        ))}
      </div>
      <button onClick={rentalCar}>Order this car</button>
      <Redirect push to={redirect} />
    </div>
  );
}
