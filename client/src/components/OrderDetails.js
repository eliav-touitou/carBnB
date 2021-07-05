import React from "react";
import { useLocation, useParams } from "react-router-dom";

export default function OrderDetails() {
  const { orderId } = useParams();
  const { state } = useLocation();

  const order = state.order;
  return (
    <table className="order-details-container">
      {console.log(order)}
      <h3>transaction number: {order.transactionId} </h3>
      <a href={`mailto:${order.ownerEmail}`}>owner email</a>
      <p>Barnd: {order.brand} </p>
      <p>Model: {order.model} </p>
      <p>Year: {order.year} </p>
      <p>Fuel: {order.fuel} </p>
      <p>Gear: {order.gear} </p>
      <p>Passengers: {order.passengers} </p>
      <p>Start date: {new Date(order.startDate).toDateString()} </p>
      <p>End date: {new Date(order.endDate).toDateString()} </p>
      <p>Order status: {order.isActive} </p>
      <p>Total price: {order.totalPrice} </p>
    </table>
  );
}
