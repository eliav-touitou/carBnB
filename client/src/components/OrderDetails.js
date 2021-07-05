import React from "react";
import { useLocation, useParams } from "react-router-dom";

export default function OrderDetails({ order }) {
  return (
    <ul>
      <li>Barnd: {order.brand} </li>
      <li>Model: {order.model} </li>
      <li>Year: {order.year} </li>
      <li>Fuel: {order.fuel} </li>
      <li>Gear: {order.gear} </li>
      <li>Passengers: {order.passengers} </li>
      <li>Start date: {new Date(order.startDate).toDateString()} </li>
      <li>End date: {new Date(order.endDate).toDateString()} </li>
      <li>Order status: {order.isActive} </li>
      <li>Total price: {order.totalPrice} $</li>
    </ul>
  );
}
