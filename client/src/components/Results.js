import React, { useState } from "react";
import { useSelector } from "react-redux";
import Result from "./Result";
import SideBar from "./SideBar";
import FilterCheck from "./FilterCheck";
import FilterBar from "./FilterBar";
import SearchBar from "./SearchBar";

export default function Results() {
  // Redux states
  const filteredCars = useSelector((state) => state.filteredCars);
  const initialSearch = useSelector((state) => state.initialSearch);

  return (
    <div className="results-page">
      <FilterCheck />

      <div className="results-section">
        <h1>Cars in {initialSearch.city} </h1>
        <h3>
          {" "}
          {new Date(initialSearch.startDate).toDateString()} -{" "}
          {new Date(initialSearch.endDate).toDateString()}{" "}
        </h3>
        <div className="search-bar-in-results-page">
          <SearchBar />
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
