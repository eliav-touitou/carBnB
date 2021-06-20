import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function CarDetails() {
  const availableCars = useSelector((state) => state.availableCars);
  const { resultId } = useParams();

  return (
    <div>
      <p>מלא פרטים על הרכב 😃😃🍏🍏</p>
      <p>owner_email: {availableCars[resultId].owner_email} </p>
      <p>barnd: {availableCars[resultId].brand} </p>
      <p>year: {availableCars[resultId].year} </p>
      <p>model: {availableCars[resultId].model} </p>
      <p>fuel: {availableCars[resultId].fuel} </p>
      <p>passengers: {availableCars[resultId].passengers} </p>
      <p>price_per_day: {availableCars[resultId].price_per_day} </p>
      <p>price_per_week: {availableCars[resultId].price_per_week} </p>
      <p>price_per_month: {availableCars[resultId].price_per_month} </p>
      <p>free to rental: {String(availableCars[resultId].is_rented)} </p>
      <p>gear: {availableCars[resultId].gear} </p>
    </div>
  );
}
