import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import OrderDetails from "./OrderDetails";

export default function MyOrders() {
  const { type } = useParams();

  // Redux states
  const auth = useSelector((state) => state.auth);

  //Use states
  const [allOrders, setAllOrders] = useState([]);

  useEffect(() => {
    const orderOrRental = type === "orders" ? "renter_email" : "owner_email";
    axios
      .post("/api/v1/rentals/myorders", {
        data: [auth.user_email, orderOrRental],
      })
      .then(({ data }) => {
        setAllOrders(data.data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [window.location.href]);

  return (
    <div className="my-order-page">
      {allOrders.map((order, i) => (
        <div class="artboard">
          <div class="card">
            <div class="card__side card__side--back">
              <div class="card__cover">
                <h4 class="card__heading">
                  <span class="card__heading-span">
                    Order number: {order.transactionId}
                  </span>
                </h4>
              </div>
              <div class="card__details">
                <OrderDetails order={order} />
              </div>
            </div>

            <div class="card__side card__side--front">
              <div class="card__theme">
                <div class="card__theme-box">
                  <p class="card__title">
                    {" "}
                    Order number: {order.transactionId}
                  </p>
                  <p class="card__subject">
                    {type === "rentals" ? "Order from you" : "Cars you ordered"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
