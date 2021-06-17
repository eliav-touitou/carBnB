import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllModelsApi } from "../actions";
import PriceSlider from "./PriceSlider";
import YearsSlider from "./YearsSlider";
import RatingSlider from "./RatingSlider";
import { setAvailableCars } from "../actions";

export default function FilterBar() {
  const [filteredCars, setFilteredCars] = useState([]);
  const availableCars = useSelector((state) => state.availableCars);
  const dispatch = useDispatch();
  const allCarsApi = useSelector((state) => state.allCarsApi);
  const allModelsApi = useSelector((state) => state.allModelsApi);

  const [yearsArr, setYearsArr] = useState([]);
  const apiCars = "https://vpic.nhtsa.dot.gov/api";
  const gearOptions = ["Manual", "Auto"];
  const fuelTypes = [
    "Octan-95",
    "Octan-96",
    "Octan-98",
    "Soler",
    "Electric",
    "Gas",
  ];

  const brandRef = useRef();
  const modelRef = useRef();
  const gearRef = useRef();
  const yearRef = useRef();
  const fuelRef = useRef();
  const pricePerDayRef = useRef();

  useEffect(() => {
    let temp = [];
    const endYear = parseInt(new Date().getFullYear());
    for (let i = endYear; i >= 1980; i--) {
      temp.push(i);
    }
    setYearsArr(temp);
  }, []);

  const onBrandChangeHandler = async () => {
    allCarsApi?.forEach((car) => {
      if (car.MakeName.toLowerCase() === brandRef.current.value.toLowerCase()) {
        axios
          .get(
            apiCars + `/vehicles/GetModelsForMake/${car.MakeName}?format=json`
          )
          .then(({ data }) => {
            dispatch(setAllModelsApi(data.Results));
          })
          .catch((err) => console.log(err));
      } else {
        modelRef.current.value = "";
      }
    });
  };

  // Upload new car to database
  const filterCars = async () => {
    const filteredCars = [];
    const parameters = {
      brand: brandRef.current.value,
      model: modelRef.current.value,
      gear: gearRef.current.value,
      year: yearRef.current.value,
      fuel: fuelRef.current.value,
      pricePerDay: pricePerDayRef.current.value,
    };
    console.log(availableCars);
  };

  return (
    <div>
      <div>
        pick your car brand
        <input
          ref={brandRef}
          list="brand"
          onChange={onBrandChangeHandler}
        ></input>
        <datalist id="brand">
          {allCarsApi?.map((car, i) => (
            <option key={`brand-${i}`} value={`${car.MakeName}`} />
          ))}
        </datalist>
      </div>
      <div>
        pick your car model
        <input ref={modelRef} list="model"></input>
        <datalist id="model">
          {allModelsApi?.map((model, i) => (
            <option key={`model-${i}`} value={`${model.Model_Name}`} />
          ))}
        </datalist>
      </div>
      <div>
        pick your car gear
        <input ref={gearRef} list="gear"></input>
        <datalist id="gear">
          {gearOptions?.map((gear, i) => (
            <option key={`gear-${i}`} value={gear} />
          ))}
        </datalist>
      </div>
      <div>
        pick your car gas type
        <input ref={fuelRef} list="fuel"></input>
        <datalist id="fuel">
          {fuelTypes?.map((fuel, i) => (
            <option key={`fuel-${i}`} value={fuel} />
          ))}
        </datalist>
      </div>
      <div>
        pick your car year
        <YearsSlider />
      </div>
      <div>
        Enter wanted tariff per day
        <PriceSlider />
      </div>
      {/* <div>
        Rating Of Cars Owners:
        <RatingSlider />
      </div> */}
      <div>
        <button onClick={filterCars}>Filter!</button>
      </div>
    </div>
  );
}
