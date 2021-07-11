import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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
      })
      .catch((err) => {
        console.log(err);
      });
  }, [window.location.href]);

  return (
    <div className="my-order-page">
      {allOrders.map((order, i) => (
        <div key={`order-${i}`} className="artboard">
          <div className="card">
            <div className="card__side card__side--back">
              <div className="card__cover">
                <h4 className="card__heading">
                  <span className="card__heading-span">
                    Order number: {order.transactionId}
                  </span>
                </h4>
              </div>
              <div className="card__details">
                <OrderDetails order={order} />
              </div>
            </div>

            <div className="card__side card__side--front">
              <div className="card__theme">
                <div className="card__theme-box">
                  <p className="card__title">
                    {" "}
                    Order number: {order.transactionId}
                  </p>
                  <p className="card__subject">
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
