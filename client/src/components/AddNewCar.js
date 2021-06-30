import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllModelsApi, setAllCarsApi, setPhotosArray } from "../actions";
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
    <div className="add-new-car-page">
      <div className="add-car-panel">
        <div className="left-side-panel"></div>
        <div className="right-side-panel">
          <div className="fields-inputs">
            <div className="input-div">
              <div className="title">pick your car brand</div>
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
              <div className="title">pick your car model</div>
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
              {/* pick your car gear</div>
              <input
                className="gear-input-addNewCar"
                ref={gearRef}
                list="gear"
              ></input>
              <datalist id="gear">
                {gearOptions?.map((gear, i) => (
                  <option key={`gear-${i}`} value={gear} />
                ))}
              </datalist>*/}
              <div className="pets-gender">
                <div className="title">
                  <label htmlFor="pet-gender-female">Gear</label>
                </div>
                <div className="radio-container">
                  <input
                    id="pet-gender-female"
                    name="pet-gender"
                    type="radio"
                    defaultValue="female"
                  />
                  <label htmlFor="pet-gender-female">Manuel</label>
                  <input
                    id="pet-gender-male"
                    name="pet-gender"
                    type="radio"
                    defaultValue="male"
                  />
                  <label htmlFor="pet-gender-male">Automat</label>
                </div>
              </div>
            </div>
            <div className="input-div">
              <div className="title">pick your car year</div>
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
              <div className="title">pick your car gas type</div>
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
            <div className="input-div">
              <div className="title">number of seats</div>
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
            <div className="input-div">
              <div className="title">Enter wanted tariff per day</div>
              <input
                className="tariff-input-addNewCar"
                ref={pricePerDayRef}
                placeholder="Enter wanted tariff per day"
              ></input>
            </div>
            <div className="input-div">
              <div className="title">percent of discount per week</div>
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
            <div className="input-div">
              <div className="title">percent of discount per month</div>
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
                  min={tomorrow}
                  max="2022-02-01"
                ></input>
              </div>
            </div>
            <UploadPhoto id={id} />
          </div>
          <div className="submit-btn">
            <button onClick={uploadCar}>Upload Car</button>
          </div>
        </div>
      </div>
    </div>
    ////////////////////////////////////////////////////////////////////////////
    //     // ;<div className="signup-container">
    //   <div className="left-container">
    //     <h1>
    //       <i className="fas fa-paw" />
    //       PUPASSURE
    //     </h1>
    //     <div className="puppy">
    //       <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/38816/image-from-rawpixel-id-542207-jpeg.png" />
    //     </div>
    //   </div>
    //   <div className="right-container">
    //     <header>
    //       <h1>Yay, puppies! Ensure your pup gets the best care! </h1>
    //       <div className="set">
    //         <div className="pets-name">
    //           <label htmlFor="pets-name">Name</label>
    //           <input id="pets-name" placeholder="Pet's name" type="text" />
    //         </div>
    //         <div className="pets-photo">
    //           <button id="pets-upload">
    //             <i className="fas fa-camera-retro" />
    //           </button>
    //           <label htmlFor="pets-upload">Upload a photo</label>
    //         </div>
    //       </div>
    //       <div className="set">
    //         <div className="pets-breed">
    //           <label htmlFor="pets-breed">Breed</label>
    //           <input id="pets-breed" placeholder="Pet's breed" type="text" />
    //         </div>
    //         <div className="pets-birthday">
    //           <label htmlFor="pets-birthday">Birthday</label>
    //           <input id="pets-birthday" placeholder="MM/DD/YYYY" type="text" />
    //         </div>
    //       </div>
    //       <div className="set">
    //         <div className="pets-gender">
    //           <label htmlFor="pet-gender-female">Gender</label>
    //           <div className="radio-container">
    //             <input
    //               id="pet-gender-female"
    //               name="pet-gender"
    //               type="radio"
    //               defaultValue="female"
    //             />
    //             <label htmlFor="pet-gender-female">Female</label>
    //             <input
    //               id="pet-gender-male"
    //               name="pet-gender"
    //               type="radio"
    //               defaultValue="male"
    //             />
    //             <label htmlFor="pet-gender-male">Male</label>
    //           </div>
    //         </div>
    //         <div className="pets-spayed-neutered">
    //           <label htmlFor="pet-spayed">Spayed or Neutered</label>
    //           <div className="radio-container">
    //             <input
    //               id="pet-spayed"
    //               name="spayed-neutered"
    //               type="radio"
    //               defaultValue="spayed"
    //             />
    //             <label htmlFor="pet-spayed">Spayed</label>
    //             <input
    //               id="pet-neutered"
    //               name="spayed-neutered"
    //               type="radio"
    //               defaultValue="neutered"
    //             />
    //             <label htmlFor="pet-neutered">Neutered</label>
    //           </div>
    //         </div>
    //       </div>
    //       <div className="pets-weight">
    //         <label htmlFor="pet-weight-0-25">Weight</label>
    //         <div className="radio-container">
    //           <input
    //             id="pet-weight-0-25"
    //             name="pet-weight"
    //             type="radio"
    //             defaultValue="0-25"
    //           />
    //           <label htmlFor="pet-weight-0-25">0-25 lbs</label>
    //           <input
    //             id="pet-weight-25-50"
    //             name="pet-weight"
    //             type="radio"
    //             defaultValue="25-50"
    //           />
    //           <label htmlFor="pet-weight-25-50">25-50 lbs</label>
    //           <input
    //             id="pet-weight-50-100"
    //             name="pet-weight"
    //             type="radio"
    //             defaultValue="50-100"
    //           />
    //           <label htmlFor="pet-weight-50-100">50-100 lbs</label>
    //           <input
    //             id="pet-weight-100-plus"
    //             name="pet-weight"
    //             type="radio"
    //             defaultValue="100+"
    //           />
    //           <label htmlFor="pet-weight-100-plus">100+ lbs</label>
    //         </div>
    //       </div>
    //     </header>
    //     <footer>
    //       <div className="set">
    //         <button id="back">Back</button>
    //         <button id="next">Next</button>
    //       </div>
    //     </footer>
    //   </div>
    // </div>

    //////////////////////////////////////////////////////////////
  );
}
