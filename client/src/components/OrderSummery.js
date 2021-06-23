import React from "react";
import { useSelector } from "react-redux";

export default function OrderSummery() {
  // Redux state
  const rentalDetails = useSelector((state) => state.rentalDetails);
  const array = Object.entries(rentalDetails);
  return (
    <div>
      <h1>Your order was successfully made! </h1>
      {array?.map(([key, val], i) => (
        <div key={`line-${i}`}>{key + ": " + val}</div>
      ))}
    </div>
  );
}
