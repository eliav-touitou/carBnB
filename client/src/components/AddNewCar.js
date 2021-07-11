import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setAllModelsApi,
  setAllCarsApi,
  setPhotosArray,
  setNotFoundMessage,
} from "../actions";
import UploadPhoto from "./UploadPhoto";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import "react-dates/lib/css/_datepicker.css";
import "../react_dates_overrides.css";
import { setAuth } from "../actions";
import { Redirect } from "react-router";
import Snackbar from "@material-ui/core/Snackbar";

export default function AddNewCar() {
  const dispatch = useDispatch();

  let id;

  // Redux states
  const allCarsApi = useSelector((state) => state.allCarsApi);
  const allModelsApi = useSelector((state) => state.allModelsApi);
  const auth = useSelector((state) => state.auth);
  const photosArray = useSelector((state) => state.photosArray);
  const notFoundMessage = useSelector((state) => state.notFoundMessage);

  // Use states
  const [yearsArr, setYearsArr] = useState([]);
  const [percentage, setPercentage] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [redirect, setRedirect] = useState(false);
  const [gearType, setGearType] = useState("Manuel");
  const [gasType, setGasType] = useState("Octan-95");

  // Global variables
  const apiCars = "https://vpic.nhtsa.dot.gov/api";
  const seatsOptions = ["2", "4", "5", "6", "7"];

  // UseRefs
  const brandRef = useRef();
  const modelRef = useRef();
  const yearRef = useRef();
  const pricePerDayRef = useRef();
  const discountPerWeekRef = useRef();
  const discountPerMonthRef = useRef();
  const passengersRef = useRef();

  //Checking if logged user has an address before adding a car
  useEffect(() => {
    if (auth.address === null) {
      dispatch(
        setNotFoundMessage(
          "You must update your address before becoming a host"
        )
      );
    }
  }, []);
  useEffect(() => {
    if (notFoundMessage) {
      setTimeout(() => {
        dispatch(setNotFoundMessage(false));
        setRedirect(true);
      }, 4000);
    }
  }, [notFoundMessage]);

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
      gear: gearType,
      year: yearRef.current.value,
      fuel: gasType,
      until: endDate === "" ? null : endDate,
      from: startDate === "" ? null : startDate,
      passengers: parseInt(passengersRef.current.value),
      pricePerDay: pricePerDayRef.current.value,
      discountPerWeek: discountPerWeekRef.current.value,
      discountPerMonth: discountPerMonthRef.current.value,
    };
    try {
      if (auth) {
        const { data: savedCar } = await axios.post("/api/v1/cars/upload", {
          newCar: newCar,
        });
        // console.log(savedCar);
        id = savedCar.data.car_id;
        photosArray.forEach((photo) => (photo.car_id = id));
        dispatch(setPhotosArray(photosArray));
        await axios.post("/api/v1/photos/savephotos", photosArray);
        setRedirect(true);
      } else {
        // need to prompt login promp component
      }
    } catch (error) {
      if (error.response.status === 403) {
        dispatch(setAuth(false));
        alert("please login again");
      }
      console.log(error);
    }
  };

  // Handle dates on changes
  const handleDatesChange = ({ startDate, endDate }) => {
    setStartDate(startDate);
    setEndDate(endDate);
  };
  return (
    <div className="add-new-car-page">
      {notFoundMessage && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={true}
          message={notFoundMessage}
          key={"top" + "center"}
        />
      )}
      <div className="add-car-panel">
        <div className="left-side-panel">
          {/* <img width="150%" height="auto" bottom src={dog} /> */}
        </div>
        <div className="right-side-panel">
          <div className="fields-inputs">
            <h1>We invite you to become a member in our host's team</h1>
            <div className="set">
              <div className="input-div">
                <div className="title">Pick your car brand</div>
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
              <div className="input-div">
                <UploadPhoto id={id} />
              </div>
            </div>
            <div className="set">
              <div className="input-div">
                <div className="title">Pick your car model</div>
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
              <div className="input-div">
                <div
                  className="Car-gear"
                  onChange={(e) => setGearType(e.target.value)}
                >
                  <div className="title">
                    <label htmlFor="Manuel">Gear</label>
                  </div>
                  <div className="radio-container">
                    <input
                      id="Manuel"
                      name="car-gear"
                      type="radio"
                      defaultValue="Manuel"
                      defaultChecked={true}
                    />
                    <label htmlFor="Manuel">Manuel</label>
                    <input
                      id="Automat"
                      name="car-gear"
                      type="radio"
                      defaultValue="Automat"
                    />
                    <label htmlFor="Automat">Automat</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="set">
              <div className="input-div">
                <div className="title">Pick your car year</div>
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
              <div className="input-div">
                <div className="title">Availability dates </div>
                <DateRangePicker
                  startDate={startDate}
                  startDatePlaceholderText="Start date:"
                  startDateId="tata-start-date"
                  endDate={endDate}
                  endDatePlaceholderText="End date:"
                  endDateId="tata-end-date"
                  onDatesChange={handleDatesChange}
                  focusedInput={focusedInput}
                  onFocusChange={(focusedInput) =>
                    setFocusedInput(focusedInput)
                  }
                  small={true}
                />
              </div>

              <div className="set">
                <div className="input-div">
                  <div className="title">Enter wanted price per day</div>
                  <input
                    className="tariff-input-addNewCar"
                    ref={pricePerDayRef}
                  ></input>
                </div>
                <div className="input-div">
                  <div className="title">Number of seats</div>
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
              </div>

              <div className="set">
                <div className="input-div">
                  <div className="title">Percent of discount per month</div>
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
                <div className="input-div">
                  <div className="title">Percent of discount per week</div>
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
              </div>
            </div>

            <div className="set">
              <div
                className="gas-type"
                onChange={(e) => setGasType(e.target.value)}
              >
                <label className="title" htmlFor="Octan-95">
                  Pick your car gas type
                </label>
                <div className="radio-container">
                  <input
                    id="Octan-95"
                    name="type-of-gas"
                    type="radio"
                    defaultValue="Octan-95"
                    defaultChecked={true}
                  />
                  <label htmlFor="Octan-95">Octan-95</label>
                  <input
                    id="Octan-96"
                    name="type-of-gas"
                    type="radio"
                    defaultValue="Octan-96"
                  />
                  <label htmlFor="Octan-96">Octan-96</label>
                  <input
                    id="Octan-98"
                    name="type-of-gas"
                    type="radio"
                    defaultValue="Octan-98"
                  />
                  <label htmlFor="Octan-98">Octan-98</label>
                  <input
                    id="Soler"
                    name="type-of-gas"
                    type="radio"
                    defaultValue="Soler"
                  />
                  <label htmlFor="Soler">Soler</label>
                  <input
                    id="Electric"
                    name="type-of-gas"
                    type="radio"
                    defaultValue="Electric"
                  />
                  <label htmlFor="Electric">Electric</label>
                  <input
                    id="Gas"
                    name="type-of-gas"
                    type="radio"
                    defaultValue="Gas"
                  />
                  <label htmlFor="Gas">Gas</label>
                </div>
              </div>
            </div>
          </div>
          <div className="submit-btn">
            <button onClick={uploadCar}>Upload Car</button>
            {redirect && <Redirect to="/profile" />}
          </div>
        </div>
      </div>
    </div>
  );
}
