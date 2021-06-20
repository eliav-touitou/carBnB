import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function CarDetails() {
  const { resultId } = useParams();

  // Redux States
  const availableCars = useSelector((state) => state.availableCars);
  const initialSearch = useSelector((state) => state.initialSearch);
  const auth = useSelector((state) => state.auth);

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
        await axios.post("/api/v1/rentals/new", { data: data });
      } else {
        // need to prompt login promp component
      }
    } catch (error) {
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

    if (numberOfDaysToRent >= 7 && numberOfDaysToRent < 30) {
      const percent = discountAboveWeek.slice(0, -1);
      newPrice =
        (pricePerDay - (percent / 100) * pricePerDay) * numberOfDaysToRent;
      return { price: newPrice, percent: `${percent}%`, days: "week" };
    }

    if (numberOfDaysToRent >= 30) {
      const percent = discountAboveMonth.slice(0, -1);
      newPrice =
        (pricePerDay - (percent / 100) * pricePerDay) * numberOfDaysToRent;
      return { price: newPrice, percent: `${percent}%`, days: "month" };
    }
  };

  return (
    <div>
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
      <button onClick={rentalCar}>Order this car</button>
    </div>
  );
}
