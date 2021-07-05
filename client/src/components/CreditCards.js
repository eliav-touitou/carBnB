import axios from "axios";
import React, { useState } from "react";
import Cards from "react-credit-cards";
import "react-credit-cards/lib/styles-compiled.css";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  setRentalDetails,
  setAvailableCars,
  setFilteredCars,
  setInitialSearch,
  setNotFoundMessage,
  setAuth,
} from "../actions";
// import "react-credit-cards/es/styles-compiled.css";
import Snackbar from "@material-ui/core/Snackbar";

export default function CreditCards() {
  const dispatch = useDispatch();

  // Redux states
  const auth = useSelector((state) => state.auth);
  const initialSearch = useSelector((state) => state.initialSearch);
  const carToRental = useSelector((state) => state.carToRental);

  // Use State
  const [image, setImage] = useState([]);
  const [redirect, setRedirect] = useState("/payment");
  const [isTakenMessage, setIsTakenMessage] = useState(false);
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

  const makeOrder = async (e) => {
    e.preventDefault();
    try {
      const rental = await axios.post("/api/v1/rentals/new", {
        data: { rentalDetails: carToRental, userDetails: auth },
      });

      // If order succeed redirect to summery
      if (rental.status === 201) {
        dispatch(setRentalDetails(rental.data.data));
        setRedirect("/summery");
      }
    } catch (error) {
      // If in the middle of the order, someone else took this car
      if (error.response.status === 400) {
        await resetAvailableCars();
      }
      console.log(error);
    }
    try {
      const arr = ["User", ["license"], auth.user_email, [image]];
      await axios.post("api/v1/users/updateitems", { data: arr });
      auth.license = image;
      dispatch(setAuth(auth));
    } catch (error) {
      console.log(error);
    }
  };

  // Handle with difference cases
  const resetAvailableCars = async () => {
    try {
      const { data: availableCars } = await axios.post(
        "api/v1/search/initial",
        { data: initialSearch }
      );

      // If still there are available Cars, redirect to results
      dispatch(setAvailableCars(availableCars.data));
      dispatch(setFilteredCars(availableCars.data));
      setIsTakenMessage(true);
      setTimeout(() => {
        setIsTakenMessage(false);
        setRedirect("/results");
      }, 5000);
    } catch (err) {
      // If still there no available Cars, redirect to home
      if (err.response.status === 404) {
        setRedirect("/");
        dispatch(setAvailableCars([]));
        dispatch(setFilteredCars([]));
        dispatch(setInitialSearch([]));
        dispatch(setNotFoundMessage(err.response.data.message));
      }
      console.log(err);
    }
  };

  const imageToBinary = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
      const data = await reader.result.split(",")[1];
      setImage(data);
    };
    reader.readAsDataURL(file);
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
          <form>
            <input
              type="text"
              name="number"
              placeholder="Card Number"
              onChange={handleInputChange}
              maxLength="16"
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
              name="cvc"
              placeholder="CVC"
              onChange={handleInputChange}
            />
            {isTakenMessage && (
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={true}
                message={`Oops.. someone just pick the car. \nyou are redirect to all
              results again:(`}
                key={"top" + "center"}
              />
            )}
          </form>

          {auth.license === null ? (
            <div>
              <h3>You must upload your licenses first!!</h3>
              <input
                className="upload-photo-rental"
                type="file"
                onChange={(e) => imageToBinary(e)}
              ></input>
            </div>
          ) : null}
        </div>
        <button onClick={makeOrder}>ORDER!</button>
      </div>
      <Redirect push to={redirect} />
    </div>
  );
}
