import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { setPhotosArray, setShowLogin, setCarToRental } from "../actions";

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

  // Redux States
  const availableCars = useSelector((state) => state.availableCars);
  const initialSearch = useSelector((state) => state.initialSearch);
  const photosArray = useSelector((state) => state.photosArray);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth) dispatch(setShowLogin(false));
  }, [auth]);

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
        carId: availableCars[resultId].car_id,
        ownerEmail: availableCars[resultId].owner_email,
        renterEmail: auth.user_email,
        startDate: initialSearch.startDate,
        endDate: initialSearch.endDate,
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
            <span className="car-specific-info">
              {availableCars[resultId].brand}
            </span>
          </p>
          <p>
            <span className="car-specific-detail">model:</span>
            <span className="car-specific-info">
              {availableCars[resultId].model}
            </span>
          </p>
          <p>
            <span className="car-specific-detail">year:</span>
            <span className="car-specific-info">
              {availableCars[resultId].year}
            </span>
          </p>
          <p>
            <span className="car-specific-detail">fuel:</span>
            <span className="car-specific-info">
              {availableCars[resultId].fuel}
            </span>
          </p>
          <p>
            <span className="car-specific-detail">gear:</span>
            <span className="car-specific-info">
              {availableCars[resultId].gear}
            </span>
          </p>
          <p>
            <span className="car-specific-detail">passengers:</span>
            <span className="car-specific-info">
              {" "}
              {availableCars[resultId].passengers}
            </span>
          </p>
          <p>
            <span className="car-specific-detail">initial price:</span>{" "}
            <span className="car-specific-info">{`${getNumberOfRentalDays()} x
        ${availableCars[resultId].price_per_day} =
        ${
          getNumberOfRentalDays() * availableCars[resultId].price_per_day
        }$`}</span>
          </p>
          {calculateDiscount().percent && (
            <p>
              <span className="car-specific-detail">{`discount for order over ${
                calculateDiscount().days
              }:`}</span>
              <span className="car-specific-info">{`${
                calculateDiscount().percent
              } , - ${
                getNumberOfRentalDays() *
                  availableCars[resultId].price_per_day -
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
          {/* <a
            className="owner-email-car-details"
            href={`mailto:${availableCars[resultId].owner_email}`}
          >
            owner email
          </a> */}
          <div className="gallery"></div>

          <button onClick={goToPayment}>go to payment</button>
          <Redirect push to={redirect} />
        </div>
      </div>
    </div>
  );
}
