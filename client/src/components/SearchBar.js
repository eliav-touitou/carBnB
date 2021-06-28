import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import {
  setFilteredCars,
  setAvailableCars,
  setInitialSearch,
  setNotFoundMessage,
} from "../actions";

import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "../react_dates_overrides.css";

export default function SearchBar({ allCitiesApi }) {
  const dispatch = useDispatch();

  // Use states
  const [resultsPage, setResultsPage] = useState("/");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);

  // UseRefs
  const cityRef = useRef();
  const passengersRef = useRef();

  const search = async () => {
    const city = cityRef.current.value;
    const passengers = Number(passengersRef.current.value.slice(0, -1));
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
                startDate={startDate}
                startDatePlaceholderText="Start date:"
                startDateId="tata-start-date"
                endDate={endDate}
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
                  placeholder="Size"
                ></input>
                <datalist id="passengers">
                  <option value="2+" />
                  <option value="4+" />
                  <option value="5+" />
                  <option value="7+" />
                  {/* <option value="else..." /> */}
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
      {/*   End nav   */}
      <Redirect push={true} to={`${resultsPage}`} />
    </div>

    // </div>
  );
}
