import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "./SearchBar";
import Avatar from "./Avatar";
import {
  setPromptOrNormal,
  setCars,
  setAuthOut,
  setNotifications,
  setNotificationCounter,
  setNotFoundMessage,
} from "../actions";

export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get(
        "https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=1271"
      )
      .then(({ data }) => {
        console.log(data);
        const temp = [];
        data.result.records?.forEach((city) => {
          if (city["שם_ישוב_לועזי"] !== " ") {
            temp.push(city["שם_ישוב_לועזי"].trim());
          }
        });
        setAllCitiesApi(temp);
      });
  }, []);

  // Redux states
  const allCars = useSelector((state) => state.allCars);
  const auth = useSelector((state) => state.auth);
  const notFoundMessage = useSelector((state) => state.notFoundMessage);

  // Use State
  const [allCitiesApi, setAllCitiesApi] = useState([]);

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
          dispatch(setNotificationCounter(count));
          dispatch(setNotifications(messages.data));
        })
        .catch((err) => console.log(err.message));
    }
  }, []);

  useEffect(() => {
    if (notFoundMessage) {
      setTimeout(() => {
        dispatch(setNotFoundMessage(false));
      }, 4500);
    }
  }, [notFoundMessage]);

  return (
    <div>
      <Avatar />
      <SearchBar allCitiesApi={allCitiesApi} />
      {notFoundMessage && <div>{notFoundMessage}</div>}
      {/* <p>messages thet not read: {counter}</p> */}
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
