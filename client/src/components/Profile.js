import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Profile() {
  const auth = useSelector((state) => state.auth);
  return (
    <div>
      <h2>Welcome Back {auth.first_name}</h2>
      <div>
        <Link to="/allmyorders/orders">my orders</Link>
      </div>
      <div>
        <Link to="/allmyorders/rentals">my rentals</Link>
      </div>
    </div>
  );
}
