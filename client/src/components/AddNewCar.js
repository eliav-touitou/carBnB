import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

export default function AddNewCar() {
  const ownerRef = useRef();
  const brandRef = useRef();
  const modelRef = useRef();
  const yearRef = useRef();
  const fuelRef = useRef();
  const pricePerDayRef = useRef();
  const pricePerWeekRef = useRef();
  const pricePerMonthRef = useRef();
  const passengersRef = useRef();
  const allCarsApi = useSelector((state) => state.allCarsApi);
  const apiCars = "https://vpic.nhtsa.dot.gov/api";
  const [allModels, setAllModels] = useState();
  const [yearsArr, setYearsArr] = useState([]);
  const fuelTypes = [
    "Octan-95",
    "Octan-96",
    "Octan-98",
    "Soler",
    "Electric",
    "Gas",
  ];
  const [percentage, setPercentage] = useState([]);
  const seatsOptions = ["2", "4", "5", "6", "7", "9", "else"];

  useEffect(() => {
    let temp = [];
    const endYear = parseInt(new Date().getFullYear());
    for (let i = endYear; i >= 1980; i--) {
      temp.push(i);
    }
    setYearsArr(temp);
    temp = [];
    for (let j = 5; j <= 50; j += 5) {
      temp.push(j + "%");
    }
    setPercentage(temp);
  }, []);

  const onChangeHandler = async () => {
    allCarsApi?.forEach((car) => {
      if (car.MakeName.toLowerCase() === brandRef.current.value.toLowerCase()) {
        axios
          .get(
            apiCars + `/vehicles/GetModelsForMake/${car.MakeName}?format=json`
          )
          .then(({ data }) => {
            setAllModels(data.Results);
          })
          .catch((err) => console.log(err));
      } else {
        modelRef.current.value = "";
      }
    });
  };

  // Upload new car to database
  const uploadCar = async () => {
    const newCar = {
      ownerEmail: ownerRef.current.value,
      brand: brandRef.current.value,
      model: modelRef.current.value,
      year: yearRef.current.value,
      fuel: fuelRef.current.value,
      passengers: parseInt(passengersRef.current.value),
      pricePerDay: pricePerDayRef.current.value,
      pricePerWeek: pricePerWeekRef.current.value,
      pricePerMonth: pricePerMonthRef.current.value,
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
      <input ref={ownerRef} placeholder="Enter Email"></input>
      <div>
        pick your car brand
        <input ref={brandRef} list="brand" onChange={onChangeHandler}></input>
        <datalist id="brand">
          {allCarsApi?.map((car) => (
            <option value={`${car.MakeName}`} />
          ))}
        </datalist>
      </div>
      <div>
        pick your car model
        <input ref={modelRef} list="model"></input>
        <datalist id="model">
          {allModels?.map((model) => (
            <option value={`${model.Model_Name}`} />
          ))}
        </datalist>
      </div>
      <div>
        pick your car year
        <input ref={yearRef} list="year"></input>
        <datalist id="year">
          {yearsArr?.map((year) => (
            <option value={year} />
          ))}
        </datalist>
      </div>
      <div>
        pick your car gas type
        <input ref={fuelRef} list="fuel"></input>
        <datalist id="fuel">
          {fuelTypes?.map((fuel) => (
            <option value={fuel} />
          ))}
        </datalist>
      </div>
      <div>
        number of seats
        <input ref={passengersRef} list="passengers"></input>
        <datalist id="passengers">
          {seatsOptions?.map((seat) => (
            <option value={seat} />
          ))}
        </datalist>
      </div>
      <div>
        Enter wanted tariff per day
        <input
          ref={pricePerDayRef}
          placeholder="Enter wanted tariff per day"
        ></input>
      </div>
      <div>
        percent of discount per week
        <input ref={pricePerWeekRef} list="pricePerWeek"></input>
        <datalist id="pricePerWeek">
          {percentage?.map((percent) => (
            <option value={percent} />
          ))}
        </datalist>
      </div>
      <div>
        percent of discount per month
        <input ref={pricePerMonthRef} list="pricePerMonth"></input>
        <datalist id="pricePerMonth">
          {percentage?.map((percent) => (
            <option value={percent} />
          ))}
        </datalist>
      </div>
      <div>
        <button onClick={uploadCar}>Upload Car</button>
      </div>
    </div>
  );
}
