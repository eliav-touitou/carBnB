import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PriceSlider from "./PriceSlider";
import YearsSlider from "./YearsSlider";
import RatingSlider from "./RatingSlider";

export default function FilterBar({ brandRef, modelRef, gearRef, fuelRef }) {
  // Redux states
  const availableCars = useSelector((state) => state.availableCars);

  // Use states
  const [modelCars, setModelCars] = useState([]);
  const [yearsArr, setYearsArr] = useState([]);

  // Global variables
  const gearOptions = ["Manual", "Auto"];
  const fuelTypes = [
    "Octan-95",
    "Octan-96",
    "Octan-98",
    "Soler",
    "Electric",
    "Gas",
  ];

  useEffect(() => {
    let temp = [];
    const endYear = parseInt(new Date().getFullYear());
    for (let i = endYear; i >= 1980; i--) {
      temp.push(i);
    }
    setYearsArr(temp);
  }, []);

  const onBrandChangeHandler = async () => {
    const temp = [];
    availableCars.forEach((car) => {
      if (car.brand.toLowerCase() === brandRef.current.value.toLowerCase()) {
        temp.push(car);
      }
      setModelCars(temp);
    });
  };

  return (
    <div>
      <div>
        pick your car brand
        <input
          className="brand-input-filterBar"
          ref={brandRef}
          list="brand"
          onChange={onBrandChangeHandler}
        ></input>
        <datalist id="brand">
          {availableCars?.map((car, i) => (
            <option key={`brand-${i}`} value={`${car.brand}`} />
          ))}
        </datalist>
      </div>
      <div>
        pick your car model
        <input
          className="model-input-filterBar"
          ref={modelRef}
          list="model"
        ></input>
        <datalist id="model">
          {modelCars.map((car, i) => (
            <option key={`model-${i}`} value={`${car.model}`} />
          ))}
        </datalist>
      </div>
      <div>
        pick your car gear
        <input
          className="gear-input-filterBar"
          ref={gearRef}
          list="gear"
        ></input>
        <datalist id="gear">
          {gearOptions?.map((gear, i) => (
            <option key={`gear-${i}`} value={gear} />
          ))}
        </datalist>
      </div>
      <div>
        pick your car gas type
        <input
          className="fuel-input-filterBar"
          ref={fuelRef}
          list="fuel"
        ></input>
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

      <div>
        Rating Of Cars Owners:
        <RatingSlider />
      </div>
    </div>
  );
}
