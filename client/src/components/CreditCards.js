import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/lib/styles-compiled.css";
// import "react-credit-cards/es/styles-compiled.css";

////////// NEED TO MOVE THE RENTAL CAR FUNCTION TO THIS COMPONENT. ////////////////////

export default function CreditCards() {
  // Use State
  const [data, setData] = useState({
    cvc: "",
    expiry: "",
    name: "",
    number: "",
  });

  // Handle credit Card Details
  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div id="" className="credit-card-page">
      <div id="" className="credit-card-container">
        <div id="PaymentForm" className="credit-card">
          <Cards
            cvc={data.cvc}
            expiry={data.expiry}
            focus={data.focus}
            name={data.name}
            number={data.number}
          />
          <form action="">
            <input
              type="number"
              name="cvc"
              placeholder="CVC"
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="expiry"
              placeholder="Expire Date"
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="number"
              placeholder="Card Number"
              onChange={handleInputChange}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
