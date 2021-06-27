import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllModelsApi, setAllCarsApi, setPhotosArray } from "../actions";
import PromptLogin from "./PromptLogin";
import UploadPhoto from "./UploadPhoto";

export default function AddNewCar() {
  const dispatch = useDispatch();

  let id;

  // Redux states
  const allCarsApi = useSelector((state) => state.allCarsApi);
  const allModelsApi = useSelector((state) => state.allModelsApi);
  const auth = useSelector((state) => state.auth);
  const photosArray = useSelector((state) => state.photosArray);

  // Use states
  const [yearsArr, setYearsArr] = useState([]);
  const [percentage, setPercentage] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [tomorrow, setTomorrow] = useState();

  const today = new Date().toISOString().slice(0, 10);

  const endDateRef = useRef();
  const startDateRef = useRef();

  useEffect(() => {
    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setTomorrow(tomorrow.toISOString().slice(0, 10));
  }, []);

  const updateTomorrow = () => {
    let startDate = new Date(startDateRef.current.value);
    startDate.setDate(startDate.getDate() + 1);
    setTomorrow(startDate.toISOString().slice(0, 10));
  };

  // Global variables
  const apiCars = "https://vpic.nhtsa.dot.gov/api";
  const gearOptions = ["Manual", "Auto"];
  const seatsOptions = ["2", "4", "5", "6", "7", "9", "else"];
  const fuelTypes = [
    "OCTAN-95",
    "OCTAN-96",
    "OCTAN-98",
    "SOLER",
    "ELECTRIC",
    "GAS",
  ];

  // UseRefs
  const ownerRef = useRef();
  const brandRef = useRef();
  const modelRef = useRef();
  const gearRef = useRef();
  const yearRef = useRef();
  const fuelRef = useRef();
  const pricePerDayRef = useRef();
  const discountPerWeekRef = useRef();
  const discountPerMonthRef = useRef();
  const passengersRef = useRef();

  // Get all cars brand from API.
  useEffect(() => {
    axios
      .get(apiCars + "/vehicles/GetMakesForVehicleType/car?format=json")
      .then(({ data }) => {
        console.log(data);
        dispatch(setAllCarsApi(data.Results));
      });
  }, []);

  useEffect(() => {
    let temp = [];
    const endYear = parseInt(new Date().getFullYear());
    for (let i = endYear; i >= 1980; i--) {
      temp.push(i);
    }
    setYearsArr(temp);
    temp = [];
    for (let j = 0; j <= 50; j += 5) {
      temp.push(j + "%");
    }
    setPercentage(temp);
  }, []);

  //emptying the photo array
  useEffect(() => {
    return () => {
      dispatch(setPhotosArray([]));
    };
  }, []);

  // After car brand selected, axios request to get all models of this brand
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
  const uploadCar = async () => {
    const newCar = {
      ownerEmail: auth.user_email,
      brand: brandRef.current.value,
      model: modelRef.current.value,
      gear: gearRef.current.value,
      year: yearRef.current.value,
      fuel: fuelRef.current.value,
      until: endDateRef.current.value,
      from: startDateRef.current.value,
      passengers: parseInt(passengersRef.current.value),
      pricePerDay: pricePerDayRef.current.value,
      discountPerWeek: discountPerWeekRef.current.value,
      discountPerMonth: discountPerMonthRef.current.value,
    };
    try {
      if (auth) {
        const { data: savedCar } = await axios.post("api/v1/cars/upload", {
          newCar: newCar,
        });
        // console.log(savedCar);
        id = savedCar.data.car_id;
        photosArray.forEach((photo) => (photo.car_id = id));
        dispatch(setPhotosArray(photosArray));
        await axios.post("api/v1/photos/savephotos", photosArray);
      } else {
        // need to prompt login promp component
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div>
        pick your car brand
        <input
          className="brand-input-addNewCar"
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
        <input
          className="model-input-addNewCar"
          ref={modelRef}
          list="model"
        ></input>
        <datalist id="model">
          {allModelsApi?.map((model, i) => (
            <option key={`model-${i}`} value={`${model.Model_Name}`} />
          ))}
        </datalist>
      </div>
      <div>
        pick your car gear
        <input
          className="gear-input-addNewCar"
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
        pick your car year
        <input
          className="year-input-addNewCar"
          ref={yearRef}
          list="year"
        ></input>
        <datalist id="year">
          {yearsArr?.map((year, i) => (
            <option key={`year-${i}`} value={year} />
          ))}
        </datalist>
      </div>
      <div>
        pick your car gas type
        <input
          className="fuel-input-addNewCar"
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
        number of seats
        <input
          className="seats-input-addNewCar"
          ref={passengersRef}
          list="passengers"
        ></input>
        <datalist id="passengers">
          {seatsOptions?.map((seat, i) => (
            <option key={`passengers-${i}`} value={seat} />
          ))}
        </datalist>
      </div>
      <div>
        Enter wanted tariff per day
        <input
          className="tariff-input-addNewCar"
          ref={pricePerDayRef}
          placeholder="Enter wanted tariff per day"
        ></input>
      </div>
      <div>
        percent of discount per week
        <input
          className="discount-week-input-addNewCar"
          ref={discountPerWeekRef}
          list="discountPerWeek"
        ></input>
        <datalist id="discountPerWeek">
          {percentage?.map((percent, i) => (
            <option key={`discountPerWeek-${i}`} value={percent} />
          ))}
        </datalist>
      </div>
      <div>
        percent of discount per month
        <input
          className="discount-month-input-addNewCar"
          ref={discountPerMonthRef}
          list="discountPerMonth"
        ></input>
        <datalist id="discountPerMonth">
          {percentage?.map((percent, i) => (
            <option key={`discountPerMonth-${i}`} value={percent} />
          ))}
        </datalist>
      </div>
      <div className="choose-dates">
        <div className="start-date">
          <label htmlFor="start">Available from:</label>
          <input
            onChange={updateTomorrow}
            ref={startDateRef}
            type="date"
            name="rent-start"
            // value={today}
            min={today}
            max="2022-01-01"
          ></input>
        </div>
        <div className="end-date">
          <label htmlFor="start">Available until:</label>
          <input
            ref={endDateRef}
            type="date"
            name="rent-end"
            // value={tomorrow}
            min={tomorrow}
            max="2022-02-01"
          ></input>
        </div>
      </div>
      <UploadPhoto id={id} />
      <div>
        <button onClick={uploadCar}>Upload Car</button>
      </div>
    </div>
  );
}
