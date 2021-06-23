import { Link } from "react-router-dom";
import React from "react";

export default function Profile() {
  return (
    <div>
      profile
      <Link to="/allmyorders/orders">my orders</Link>
      <Link to="/allmyorders/rentals">my rentals</Link>
    </div>
  );
}
