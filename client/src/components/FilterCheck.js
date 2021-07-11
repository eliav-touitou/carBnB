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
    { label: "OCTAN-95", value: "OCTAN-95" },
    { label: "OCTAN-96", value: "OCTAN-96" },
    { label: "OCTAN-98", value: "OCTAN-98" },
    { label: "SOLER", value: "SOLER" },
    { label: "ELECTRIC", value: "ELECTRIC" },
    { label: "GAS", value: "GAS" },
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
    <div className="filter-bar">
      <h4>Filter By:</h4>
      <div className="select">
        Brand
        <Select
          options={brandFilterArr}
          onChange={(e) => setSelectedBrandFilterArr(e)}
          isMulti={true}
        />
      </div>
      <div className="select">
        Model
        <Select
          options={modelFilterArr}
          onChange={(e) => setSelectedModelFilterArr(e)}
          isMulti={true}
        />
      </div>
      <div className="select">
        Fuel
        <Select
          options={fuelTypes}
          onChange={(e) => setSelectedFuelFilterArr(e)}
          isMulti={true}
        />
      </div>
      <div className="select">
        Gear
        <Select
          options={gearOptions}
          onChange={(e) => setSelectedGearFilterArr(e)}
          isMulti={true}
        />
      </div>
      <div className="slider">
        Year
        <YearsSlider />
      </div>
      <div className="slider">
        Price
        <PriceSlider />
      </div>
      <div className="slider">
        Rating Of Cars Owners:
        <RatingSlider />
      </div>
    </div>
  );
}
