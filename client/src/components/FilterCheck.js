import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select from "react-select";
import PriceSlider from "./PriceSlider";
import YearsSlider from "./YearsSlider";
import RatingSlider from "./RatingSlider";
import { setFilteredCars } from "../actions";

export default function FilterCheck() {
  const dispatch = useDispatch();

  // Redux states
  const availableCars = useSelector((state) => state.availableCars);
  const yearsFilter = useSelector((state) => state.yearsFilter);
  const priceFilter = useSelector((state) => state.priceFilter);
  const ratingFilter = useSelector((state) => state.ratingFilter);

  // Use states
  const [yearsArr, setYearsArr] = useState([]);

  // Options to choose
  const [brandFilterArr, setBrandFilterArr] = useState([]);
  const [modelFilterArr, setModelFilterArr] = useState([]);

  // Options to filter by
  const [selectedBrandFilterArr, setSelectedBrandFilterArr] = useState([]);
  const [selectedModelFilterArr, setSelectedModelFilterArr] = useState([]);
  const [selectedGearFilterArr, setSelectedGearFilterArr] = useState([]);
  const [selectedFuelFilterArr, setSelectedFuelFilterArr] = useState([]);

  // Global variables
  const gearOptions = [
    { label: "Manual", value: "Manual" },
    { label: "Auto", value: "Auto" },
  ];
  const fuelTypes = [
    { label: "Octan-95", value: "Octan-95" },
    { label: "Octan-96", value: "Octan-96" },
    { label: "Octan-98", value: "Octan-98" },
    { label: "Soler", value: "Soler" },
    { label: "Electric", value: "Electric" },
    { label: "Gas", value: "Gas" },
  ];

  useEffect(() => {
    let temp = [];
    const endYear = parseInt(new Date().getFullYear());
    for (let i = endYear; i >= 1980; i--) {
      temp.push(i);
    }
    setYearsArr(temp);
  }, []);

  useEffect(() => {
    availableCars?.forEach((car) => {
      setBrandFilterArr((prev) => [
        ...prev,
        { label: car.brand, value: car.brand },
      ]);
      setModelFilterArr((prev) => [
        ...prev,
        { label: car.model, value: car.model },
      ]);
    });
  }, []);

  useEffect(() => {
    let tempResults = availableCars;
    if (selectedBrandFilterArr.length > 0) {
      const temp = [];
      tempResults.forEach((car) => {
        selectedBrandFilterArr.forEach((filter) => {
          if (car.brand === filter.label) {
            temp.push(car);
          }
        });
      });
      tempResults = temp;
    }

    if (selectedModelFilterArr.length > 0) {
      const temp = [];
      tempResults.forEach((car) => {
        selectedModelFilterArr.forEach((filter) => {
          if (car.model === filter.label) {
            temp.push(car);
          }
        });
      });
      tempResults = temp;
    }

    if (selectedGearFilterArr.length > 0) {
      const temp = [];
      tempResults.forEach((car) => {
        selectedGearFilterArr.forEach((filter) => {
          if (car.gear === filter.label) {
            temp.push(car);
          }
        });
      });
      tempResults = temp;
    }

    if (selectedFuelFilterArr.length > 0) {
      const temp = [];
      tempResults?.forEach((car) => {
        selectedFuelFilterArr?.forEach((filter) => {
          if (car.fuel === filter.label) {
            temp.push(car);
          }
        });
      });
      tempResults = temp;
    }

    let temp = [];
    tempResults?.forEach((car) => {
      if (car.year >= yearsFilter[0] && car.year <= yearsFilter[1]) {
        temp.push(car);
      }
    });
    tempResults = temp;

    temp = [];
    tempResults?.forEach((car) => {
      if (
        car.price_per_day >= priceFilter[0] &&
        car.price_per_day <= priceFilter[1]
      ) {
        temp.push(car);
      }
    });
    tempResults = temp;

    temp = [];
    tempResults?.forEach((car) => {
      if (car.owner_rating >= ratingFilter) {
        temp.push(car);
      }
    });
    tempResults = temp;

    dispatch(setFilteredCars(tempResults));
  }, [
    selectedBrandFilterArr,
    selectedModelFilterArr,
    selectedGearFilterArr,
    selectedFuelFilterArr,
    yearsFilter,
    priceFilter,
    ratingFilter,
  ]);

  return (
    <div>
      filter your car brand
      <Select
        options={brandFilterArr}
        onChange={(e) => setSelectedBrandFilterArr(e)}
        isMulti={true}
      />
      filter your car model
      <Select
        options={modelFilterArr}
        onChange={(e) => setSelectedModelFilterArr(e)}
        isMulti={true}
      />
      filter your car fuel
      <Select
        options={fuelTypes}
        onChange={(e) => setSelectedFuelFilterArr(e)}
        isMulti={true}
      />
      filter your car gear
      <Select
        options={gearOptions}
        onChange={(e) => setSelectedGearFilterArr(e)}
        isMulti={true}
      />
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
