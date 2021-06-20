import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { setAvailableCars } from "../actions";
import { setFilteredCars } from "../actions";
import { setInitialSearch } from "../actions";

export default function SearchBar() {
  const dispatch = useDispatch();

  // Redux states
  const availableCars = useSelector((state) => state.availableCars);
  const filteredCars = useSelector((state) => state.filteredCars);
  const initialSearch = useSelector((state) => state.initialSearch);

  // Use states
  const [tomorrow, setTomorrow] = useState();
  const [resultsPage, setResultsPage] = useState("/");

  // Global variable
  const today = new Date().toISOString().slice(0, 10);

  // UseRefs
  const cityRef = useRef();
  const passengersRef = useRef();
  const endDateRef = useRef();
  const startDateRef = useRef();

  useEffect(() => {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setTomorrow(tomorrow.toISOString().slice(0, 10));
  }, []);

  const updateTomorrow = () => {
    let startDate = new Date(startDateRef.current.value);
    startDate.setDate(startDate.getDate() + 1);
    setTomorrow(startDate.toISOString().slice(0, 10));
  };

  const search = async () => {
    const city = cityRef.current.value;
    const passengers = Number(passengersRef.current.value.slice(0, -1));
    const startDate = startDateRef.current.value;
    const endDate = endDateRef.current.value;
    if (!city || !passengers || !startDate || !endDate) return;

    const searchParameters = {
      data: { city, startDate, endDate, passengers },
    };
    dispatch(setInitialSearch(searchParameters.data));
    try {
      const { data: availableCars } = await axios.post(
        "api/v1/search/initial",
        searchParameters
      );
      dispatch(setAvailableCars(availableCars.data));
      dispatch(setFilteredCars(availableCars.data));
      if (availableCars.data.length !== 0) {
        setResultsPage("/results");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="search-bar-container">
      <div className="choose-city">
        Where do you want a car?:
        <input list="Cities" ref={cityRef}></input>
        <datalist id="Cities">
          <option value="Modiin" />
          <option value="Efrat" />
          <option value="Pisgat_zeev" />
          <option value="cfar haroee" />
          <option value="Yokneam" />
        </datalist>
      </div>
      <div className="choose-dates">
        <div className="start-date">
          <label htmlFor="start">Start date:</label>
          <input
            onChange={updateTomorrow}
            ref={startDateRef}
            type="date"
            name="rent-start"
            // value={today}
            min={today}
            max="2022-01-01"
          ></input>
        </div>
        <div className="end-date">
          <label htmlFor="start">End date:</label>
          <input
            ref={endDateRef}
            type="date"
            name="rent-end"
            // value={tomorrow}
            min={tomorrow}
            max="2022-02-01"
          ></input>
        </div>
      </div>
      <div>
        what size of car you need?
        <input list="passengers" ref={passengersRef}></input>
        <datalist id="passengers">
          <option value="2+" />
          <option value="4+" />
          <option value="5+" />
          <option value="7+" />
          {/* <option value="else..." /> */}
        </datalist>
      </div>

      <button className="search-btn" onClick={search}>
        search!
      </button>
      <Redirect to={`${resultsPage}`} />
    </div>
  );
}
