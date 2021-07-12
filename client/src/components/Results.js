import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Result from "./Result";
import FilterCheck from "./FilterCheck";
import SearchBar from "./SearchBar";
import { setFilteredCars } from "../actions";
export default function Results() {
  const dispatch = useDispatch();

  // Redux states
  const filteredCars = useSelector((state) => state.filteredCars);
  const initialSearch = useSelector((state) => state.initialSearch);

  //States
  const [orderBy, setOrderBy] = useState();

  const sortBy = (parameter, order, e) => {
    if (order === "down") {
      filteredCars.sort((a, b) => a[parameter] - b[parameter]);
      dispatch(setFilteredCars(filteredCars.slice()));
    } else {
      filteredCars.sort((a, b) => b[parameter] - a[parameter]);
      dispatch(setFilteredCars(filteredCars.slice()));
    }
    console.log(e.target);
    setOrderBy(e.target.innerText);
  };

  return (
    <div className="results-page">
      <FilterCheck />

      <div className="results-section">
        <h1>
          {initialSearch.city !== ""
            ? `Cars in ${initialSearch.city}`
            : `All available cars`}{" "}
        </h1>
        <h3>
          {" "}
          {new Date(initialSearch.startDate).toDateString()} -{" "}
          {new Date(initialSearch.endDate).toDateString()}{" "}
        </h3>
        <div className="search-bar-in-results-page">
          <SearchBar />
        </div>
        <div class="dropdown">
          <button class="dropbtn">Order By:</button>
          <div class="dropdown-content">
            <div onClick={(e) => sortBy("price_per_day", "down", e)}>
              <i class="fas fa-sort-amount-down-alt"></i> Price - low to high
            </div>
            <div onClick={(e) => sortBy("price_per_day", "up", e)}>
              {" "}
              <i class="fas fa-sort-amount-down"></i> Price - high to low
            </div>
            <div onClick={(e) => sortBy("year", "down", e)}>
              <i class="fas fa-sort-numeric-down-alt"></i> Year - new to old
            </div>
            <div onClick={(e) => sortBy("year", "up", e)}>
              <i class="fas fa-sort-numeric-down"></i> Year - old to new
            </div>
          </div>
          <div className="order-label">{orderBy}</div>
        </div>
        <div className="results">
          {filteredCars?.map((car, i) => (
            <Result key={`car-${i}`} resultId={i} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
}
