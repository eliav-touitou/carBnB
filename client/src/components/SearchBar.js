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

export default function SearchBar({ allCitiesApi }) {
  const dispatch = useDispatch();

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
      dispatch(setNotFoundMessage(err.response.data.message));
      console.log(err);
    }
  };
  const focusInput = (e) => {
    e.target.childNodes[0].childNodes[1].focus();
    console.log(e);
  };
  return (
    <div className="top-navigation">
      <nav className="search-nav">
        <div className="search">
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
          <div className="search-inputs" onClick={focusInput}>
            <label htmlFor="rent-start">
              <div className="label">Start date:</div>
              <input
                onChange={updateTomorrow}
                ref={startDateRef}
                type="date"
                name="rent-start"
                // value={today}
                min={today}
                max="2022-01-01"
                placeholder="Add dates"
              ></input>
            </label>
          </div>
          <div className="separator"></div>
          <div className="search-inputs" onClick={focusInput}>
            <label htmlFor="rent-end">
              <div className="label">End date:</div>
              <input
                ref={endDateRef}
                type="date"
                name="rent-end"
                // value={tomorrow}
                min={tomorrow}
                max="2022-02-01"
                placeholder="Add dates"
              ></input>
            </label>
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
