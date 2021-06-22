import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setPromptOrNormal, setCars, setAuthOut } from "../actions";
import { setNotifications } from "../actions";
import SearchBar from "./SearchBar";
import Avatar from "./Avatar";
const axios = require("axios");

export default function Home() {
  const dispatch = useDispatch();

  // Redux states
  const allCars = useSelector((state) => state.allCars);
  const auth = useSelector((state) => state.auth);

  // Use states
  const [counter, setCounter] = useState();

  // Get all cars
  const getCars = async () => {
    try {
      const { data } = await axios.get("api/v1/cars/allcars");
      dispatch(setCars(data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  // Logout handler
  const logoutHandler = async () => {
    try {
      await axios.post("/api/v1/users/logout");
      dispatch(setAuthOut());
      console.log("Success logout");
    } catch (error) {
      console.log("Failed logout");
    }
  };

  const setNormal = () => {
    dispatch(setPromptOrNormal("normal"));
  };

  useEffect(() => {
    let count = 0;
    if (auth) {
      axios
        .post("/api/v1/notification/messages", {
          data: { email: auth.user_email },
        })
        .then(({ data: messages }) => {
          messages.data?.forEach((message) => {
            if (message.read === false) {
              count++;
            }
          });
          setCounter(count);
          dispatch(setNotifications(messages.data));
        })
        .catch((err) => console.log(err.message));
    }
  }, []);

  return (
    <div>
      <Avatar />
      <SearchBar />
      <p>messages thet not read: {counter}</p>
      <button onClick={getCars}>Get cars</button>
      {allCars?.map((car, i) => (
        <div key={`car` + i}>
          <h3>{car.brand}</h3>
          <div>{car.model}</div>
          <div>{car.year}</div>
          <hr />
        </div>
      ))}

      <Link to="/register">
        <button onClick={setNormal}>register</button>
      </Link>
      <Link to="/login">
        <button onClick={setNormal}>login</button>
      </Link>
      <button onClick={logoutHandler}>logout</button>
    </div>
  );
}
