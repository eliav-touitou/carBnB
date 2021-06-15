import axios from "axios";
import React, { useRef } from "react";

export default function AddNewCar() {
  const owner = useRef();
  const brand = useRef();
  const model = useRef();
  const year = useRef();
  const fuel = useRef();
  const pricePerDay = useRef();
  const pricePerWeek = useRef();
  const pricePerMonth = useRef();
  const passengers = useRef();

  // Upload new car to database
  const uploadCar = async () => {
    const newCar = {
      ownerEmail: owner.current.value,
      brand: brand.current.value,
      model: model.current.value,
      year: year.current.value,
      fuel: fuel.current.value,
      passengers: parseInt(passengers.current.value),
      pricePerDay: pricePerDay.current.value,
      pricePerWeek: pricePerWeek.current.value,
      pricePerMonth: pricePerMonth.current.value,
    };
    try {
      await axios.post("api/v1/cars/upload", { newCar: newCar });
      console.log("Car Saved!");
    } catch (error) {
      console.log(error.message);
    }
    console.log(newCar);
  };
  return (
    <div>
      <input ref={owner} placeholder="Enter Email"></input>
      <input ref={brand} placeholder="Enter Car's Brand"></input>
      <input ref={model} placeholder="Enter Car's model"></input>
      <input ref={year} placeholder="Enter Car's manufacture year"></input>
      <input ref={fuel} placeholder="Enter Car's gas type"></input>
      <input
        ref={pricePerDay}
        placeholder="Enter wanted tariff per day"
      ></input>
      <input
        ref={pricePerWeek}
        placeholder="Enter wanted tariff per week"
      ></input>
      <input
        ref={pricePerMonth}
        placeholder="Enter wanted tariff per Month"
      ></input>
      <p>Choose number of passengers:</p>

      <form action="/action_page.php">
        <select
          name="passengers"
          id="passengers"
          // onChange={(e) => {
          //   console.log(e.target.value);
          // }}
          ref={passengers}
        >
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="7">7</option>
          <option value="9">9</option>
        </select>
      </form>

      <div>
        <button onClick={uploadCar}>Upload Car</button>
      </div>
      <button onClick={() => console.log(passengers.current.value)}>
        fuck
      </button>
    </div>
  );
}
