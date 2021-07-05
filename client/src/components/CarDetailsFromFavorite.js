import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom";
import { setPhotosArray, setShowLogin, setCarToRental } from "../actions";
import Carousel from "react-elastic-carousel";

import {
  setRentalDetails,
  setAvailableCars,
  setFilteredCars,
  setInitialSearch,
  setNotFoundMessage,
} from "../actions";

export default function CarDetailsFromFavorite() {
  const dispatch = useDispatch();
  const { car, dates } = useLocation().state;
  console.log(dates);

  //bringing the photos of the corresponding car, and emptying it on component down
  useEffect(() => {
    const photosData = ["Photo", ["car_id"], [car.car_id]];
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
  const [redirect, setRedirect] = useState();

  // Redux States

  const photosArray = useSelector((state) => state.photosArray);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth) dispatch(setShowLogin(false));
  }, [auth]);

  // Function for get numbers of days rental
  const getNumberOfRentalDays = () => {
    const numberOfDaysToRent = Math.round(
      (new Date(dates.endDate) - new Date(dates.startDate)) /
        (1000 * 60 * 60 * 24)
    );
    return numberOfDaysToRent;
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
      return { price: newPrice };
    }

    if (numberOfDaysToRent >= 30) {
      const percent = discountAboveMonth.slice(0, -1);
      newPrice =
        (pricePerDay - (percent / 100) * pricePerDay) * numberOfDaysToRent;
      return { price: newPrice, percent: `${percent}%`, days: "month" };
    }
    if (numberOfDaysToRent >= 7 && numberOfDaysToRent < 30) {
      const percent = discountAboveWeek.slice(0, -1);
      newPrice =
        (pricePerDay - (percent / 100) * pricePerDay) * numberOfDaysToRent;
      return { price: newPrice, percent: `${percent}%`, days: "week" };
    }
  };

  const goToPayment = () => {
    if (auth) {
      const data = {
        carId: car.car_id,
        ownerEmail: car.owner_email,
        renterEmail: auth.user_email,
        startDate: dates.startDate,
        endDate: dates.endDate,
        totalPrice: calculateDiscount().price,
      };
      dispatch(setCarToRental(data));
      setRedirect("/payment");
    } else {
      // need to prompt login component
      dispatch(setShowLogin(true));
      console.log("must log in first!");
    }
  };

  return (
    <div className="car-details-page">
      <div className="car-details-outer-container">
        <div className="car-details-inner-container">
          <p>
            <span className="car-specific-detail">barnd:</span>
            <span className="car-specific-info">{car.brand}</span>
          </p>
          <p>
            <span className="car-specific-detail">model:</span>
            <span className="car-specific-info">{car.model}</span>
          </p>
          <p>
            <span className="car-specific-detail">year:</span>
            <span className="car-specific-info">{car.year}</span>
          </p>
          <p>
            <span className="car-specific-detail">fuel:</span>
            <span className="car-specific-info">{car.fuel}</span>
          </p>
          <p>
            <span className="car-specific-detail">gear:</span>
            <span className="car-specific-info">{car.gear}</span>
          </p>
          <p>
            <span className="car-specific-detail">passengers:</span>
            <span className="car-specific-info"> {car.passengers}</span>
          </p>
          <p>
            <span className="car-specific-detail">initial price:</span>{" "}
            <span className="car-specific-info">{`${getNumberOfRentalDays()} x
        ${car.price_per_day} =
        ${getNumberOfRentalDays() * car.price_per_day}$`}</span>
          </p>
          {calculateDiscount().percent && (
            <p>
              <span className="car-specific-detail">{`discount for order over ${
                calculateDiscount().days
              }:`}</span>
              <span className="car-specific-info">{`${
                calculateDiscount().percent
              } , - ${
                getNumberOfRentalDays() * car.price_per_day -
                calculateDiscount().price
              } $`}</span>
            </p>
          )}
          <p>
            <span className="car-specific-detail">Total price:</span>
            {
              <span className="car-specific-info">
                {calculateDiscount().price}$
              </span>
            }
          </p>
          <div className="gallery"></div>
          {photosArray.length !== 0 && (
            <Carousel>
              {photosArray?.map((photo, i) => (
                <img
                  alt="license"
                  key={`photo-${i}`}
                  src={`data:image/jpeg;base64,${photo.file}`}
                  height={100}
                />
              ))}
            </Carousel>
          )}

          <button onClick={goToPayment}>go to payment</button>
        </div>
        {redirect && <Redirect push to="/payment" />}
      </div>
    </div>
  );
}
