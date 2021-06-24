import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Select from "react-select";
import PriceSlider from "./PriceSlider";
import YearsSlider from "./YearsSlider";
import RatingSlider from "./RatingSlider";

export default function FilterCheck() {
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
    let tempResults = [];
    /////////////////////// ---------   NEED TO FIX + FINISH   --------- ///////////////////////
    if (selectedBrandFilterArr.length > 0) {
      tempResults = availableCars?.map((car) => {
        return selectedBrandFilterArr.map((filter) => {
          if (car.brand === filter.label) {
            return car;
          }
        });
      });
    }
    if (selectedModelFilterArr.length > 0) {
      tempResults = tempResults[0]?.map((car) => {
        return selectedModelFilterArr.map((filter) => {
          if (car.model === filter.label) {
            return car;
          }
        });
      });
    }
    if (selectedGearFilterArr.length > 0) {
      tempResults = tempResults[0]?.map((car) => {
        return selectedGearFilterArr.map((filter) => {
          if (car.gear === filter.label) {
            return car;
          }
        });
      });
    }
    if (selectedFuelFilterArr.length > 0) {
      tempResults = tempResults[0]?.map((car) => {
        return selectedFuelFilterArr.map((filter) => {
          if (car.fuel === filter.label) {
            return car;
          }
        });
      });
    }
    /////////////////////// ---------   NEED TO FIX + FINISH   --------- ///////////////////////
    // tempResults = tempResults[0]?.map((car) => {
    //   if (car.year >= yearsFilter[0] && car.year <= yearsFilter[1]) {
    //     return car;
    //   }
    // });

    // tempResults = tempResults[0]?.map((car) => {
    //   if (car.price_per_day <= priceFilter) {
    //     return car;
    //   }
    // });
    // tempResults = tempResults[0]?.map((car) => {
    //   if (car.owner_rating >= ratingFilter) {
    //     return car;
    //   }
    // });
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
