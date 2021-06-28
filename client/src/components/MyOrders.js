import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

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
    <div>
      <ul className="ul-orders">
        {allOrders.map((order, i) => (
          <Link
            key={`order-${i}`}
            to={{ pathname: `/order/${i}`, state: { order } }}
          >
            <li>Order number: {order.transactionId}</li>
          </Link>
        ))}
      </ul>
    </div>
  );
}
