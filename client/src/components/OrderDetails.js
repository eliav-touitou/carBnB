import React from "react";
import { useLocation, useParams } from "react-router-dom";

export default function OrderDetails() {
  const { orderId } = useParams();
  const { state } = useLocation();

  const order = state.order;
  return (
    <div>
      {console.log(order)}
      <h3>transaction number: {order.transactionId} </h3>
      <a href={`mailto:${order.ownerEmail}`}>owner email</a>
      <p>barnd: {order.brand} </p>
      <p>model: {order.model} </p>
      <p>year: {order.year} </p>
      <p>fuel: {order.fuel} </p>
      <p>gear: {order.gear} </p>
      <p>passengers: {order.passengers} </p>
      <p>end date: {order.endDate} </p>
      <p>start date: {order.startDate} </p>
      <p>is active: {order.isActive} </p>
      <p>total price: {order.totalPrice} </p>
    </div>
  );
}
