import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import Snackbar from "@material-ui/core/Snackbar";
import {
  setFilteredCars,
  setAvailableCars,
  setInitialSearch,
  setNotFoundMessage,
  setSpinner,
} from "../actions";
import moment from "moment";

import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "../react_dates_overrides.css";

export default function SearchBar() {
  const dispatch = useDispatch();

  // Redux states
  const allCitiesApi = useSelector((state) => state.allCitiesApi);
  const initialSearch = useSelector((state) => state.initialSearch);
  const notFoundMessage = useSelector((state) => state.notFoundMessage);

  // Use states
  const [resultsPage, setResultsPage] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  // UseRefs
  const cityRef = useRef("");
  const passengersRef = useRef();

  useEffect(() => {
    if (notFoundMessage) {
      setTimeout(() => {
        dispatch(setNotFoundMessage(false));
      }, 4500);
    }
  }, [notFoundMessage]);

  const search = async () => {
    dispatch(setSpinner(true));
    const city = cityRef.current.value;
    const passengers = Number(passengersRef.current.value.slice(0, -1));

    if (window.location.href !== "http://localhost:3000/") {
      setStartDate(moment(initialSearch.startDate));
      setEndDate(moment(initialSearch.endDate));
    } else {
      if (!passengers || !startDate || !endDate) {
        dispatch(setSpinner(false));
        dispatch(setNotFoundMessage("You must fill all inputs"));
        return;
      }
    }

    const searchParameters = {
      data: {
        city,
        startDate: initialSearch.startDate,
        endDate: initialSearch.endDate,
        passengers,
      },
    };
    console.log(searchParameters);
    try {
      const { data: availableCars } = await axios.post(
        "/api/v1/search/initial",
        searchParameters
      );

      dispatch(setAvailableCars(availableCars.data));
      dispatch(setFilteredCars(availableCars.data));
      if (availableCars.data.length !== 0) {
        dispatch(setInitialSearch(searchParameters.data));
        setResultsPage(true);
        dispatch(setSpinner(false));
      }
    } catch (err) {
      dispatch(setSpinner(false));
      dispatch(setNotFoundMessage(err.response.data.message));
      console.log(err);
    }
  };

  // Focus on input
  const focusInput = (e) => {
    if (e.target.className === "search-inputs") {
      e.target.childNodes[0].childNodes[1].focus();
    }
    if (e.target.localName === "label") {
      e.target.childNodes[1].focus();
    }
    if (e.target.className === "label") {
      e.target.parentElement.childNodes[1].focus();
    }
  };

  // Handle dates on changes
  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
    initialSearch.startDate = moment(startDate);
    initialSearch.endDate = moment(endDate);
  };

  return (
    <div className="top-navigation">
      <nav className="search-nav">
        <div className="search">
          <div className="inputs">
            <div className="search-inputs" onClick={focusInput}>
              <label htmlFor="cities">
                <div className="label">City:</div>
                <input
                  name="cities"
                  list="cities"
                  ref={cityRef}
                  defaultValue={
                    window.location.href !== "http://localhost:3000/results"
                      ? undefined
                      : initialSearch?.city
                  }
                  placeholder="Wanted City"
                ></input>
                <datalist id="cities">
                  {allCitiesApi?.map((city, i) => (
                    <option key={`city-${i}`} value={city} />
                  ))}
                </datalist>
              </label>
            </div>
            <div className="separator"></div>
            <div className="search-inputs">
              <div className="label">Choose Dates:</div>
              <DateRangePicker
                startDate={
                  window.location.href !== "http://localhost:3000/results"
                    ? startDate
                    : moment(initialSearch?.startDate)
                }
                startDatePlaceholderText="Start date:"
                startDateId="tata-start-date"
                endDate={
                  window.location.href !== "http://localhost:3000/results"
                    ? endDate
                    : moment(initialSearch?.endDate)
                }
                endDatePlaceholderText="End date:"
                endDateId="tata-end-date"
                onDatesChange={handleDatesChange}
                focusedInput={focusedInput}
                onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
                small={true}
              />
            </div>
            <div className="separator"></div>
            <div className="search-inputs" onClick={focusInput}>
              <label htmlFor="passengers">
                <div className="label">What size of car you need?</div>
                <input
                  name="passengers"
                  list="passengers"
                  ref={passengersRef}
                  defaultValue={
                    window.location.href !== "http://localhost:3000/results"
                      ? undefined
                      : initialSearch?.passengers + "+"
                  }
                  placeholder="Size"
                ></input>
                <datalist id="passengers">
                  <option value="2+" />
                  <option value="4+" />
                  <option value="5+" />
                  <option value="7+" />
                </datalist>
              </label>
            </div>
          </div>
          <div className="search-button">
            <button className="search-btn" onClick={search}>
              <SearchIcon />
            </button>
          </div>
        </div>
      </nav>{" "}
      {notFoundMessage && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={true}
          message={notFoundMessage}
          key={"top" + "center"}
        />
      )}
      {resultsPage && <Redirect push={true} to={"/results"} />}
    </div>

    // </div>
  );
}
