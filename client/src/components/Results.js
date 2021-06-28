import React from "react";
import { useSelector } from "react-redux";
import Result from "./Result";
import SideBar from "./SideBar";
import FilterCheck from "./FilterCheck";
import FilterBar from "./FilterBar";

export default function Results() {
  // Redux states
  const filteredCars = useSelector((state) => state.filteredCars);

  return (
    <div className="results-page">
      <FilterCheck />
      <div className="results">
        <div className="row">
          <h1>Results</h1>
          {filteredCars?.map((car, i) => (
            <Result
              key={`car-${i}`}
              resultId={i}
              brand={car.brand}
              model={car.model}
              passengers={car.passengers}
              carId={car.car_id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
