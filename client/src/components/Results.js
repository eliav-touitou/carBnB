import React from "react";
import { useSelector } from "react-redux";
import Result from "./Result";
import SideBar from "./SideBar";
import FilterCheck from "./FilterCheck";

export default function Results() {
  // Redux states
  const filteredCars = useSelector((state) => state.filteredCars);

  return (
    <div>
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
      <SideBar />
      <FilterCheck />
    </div>
  );
}
