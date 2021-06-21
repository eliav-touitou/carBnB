import React from "react";
import { useSelector } from "react-redux";
import Result from "./Result";
import SideBar from "./SideBar";

export default function Results() {
  // Redux states
  const filteredCars = useSelector((state) => state.filteredCars);

  return (
    <div>
      <h1>Results</h1>
      {filteredCars?.map((car, i) => (
        <Result
          key={`car-${i}`}
          resultId={i}
          brand={car.brand}
          passengers={car.passengers}
          carId={car.car_id}
        />
      ))}
      <SideBar />
    </div>
  );
}
