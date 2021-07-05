import React from "react";
import { useSelector } from "react-redux";

export default function OrderSummery() {
  // Redux state
  const carToRental = useSelector((state) => state.carToRental);

  return (
    <div className="order-summery-page">
      <div className="order-summery-outer-container">
        <div className="order-summery-inner-container">
          <h1>Your order was successfully made! </h1>

          <div className="order-summery-details">
            <span className="order-summery-description">Owner Email:</span>
            <span className="order-summery-value">
              {carToRental.ownerEmail}
            </span>
          </div>
          <div className="order-summery-details">
            <span className="order-summery-description">Renter Email:</span>
            <span className="order-summery-value">
              {carToRental.renterEmail}
            </span>
          </div>
          <div className="order-summery-details">
            <span className="order-summery-description">Start Date:</span>
            <span className="order-summery-value">
              {new Date(carToRental.startDate).toDateString()}
            </span>
          </div>
          <div className="order-summery-details">
            <span className="order-summery-description">Start Date:</span>
            <span className="order-summery-value">
              {new Date(carToRental.endDate).toDateString()}
            </span>
          </div>
          <p>Check your mail inbox! you've got a receipt</p>
        </div>
      </div>
    </div>
  );
}
