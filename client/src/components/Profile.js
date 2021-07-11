import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import EventBusyIcon from "@material-ui/icons/EventBusy";
import MyCars from "./MyCars";
import AirlineSeatReclineNormalTwoToneIcon from "@material-ui/icons/AirlineSeatReclineNormalTwoTone";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";
import Overview from "./Overview";

export default function Profile() {
  const iconsKey = {
    brand: <i className="fas fa-car-side"></i>,
    year: <i className="far fa-calendar-alt"></i>,
    fuel: <i className="fas fa-gas-pump"></i>,
    price_per_day: <i className="fas fa-dollar-sign"></i>,
    gear: <i className="fas fa-cogs"></i>,
    available_from: <EventAvailableIcon />,
    available_until: <EventBusyIcon />,
    passengers: <AirlineSeatReclineNormalTwoToneIcon />,
    model: <LabelOutlinedIcon />,
    discount_for_week: <i className="fas fa-percent"></i>,
    discount_for_month: <i className="fas fa-percent"></i>,
    first_name: <i className="far fa-user"></i>,
    user_email: <i className="far fa-envelope"></i>,
    address: <i className="fas fa-map-marker-alt"></i>,
    phone_number: <i className="fas fa-phone-alt"></i>,
  };

  // Redux states
  const auth = useSelector((state) => state.auth);

  // Use states
  const [myCarsData, setMyCarsData] = useState();
  const [displayOverview, setDisplayOverview] = useState(true);
  const [indexPage, setIndexPage] = useState(0);

  useEffect(() => {
    axios
      .post("/api/v1/search/getitem", {
        data: ["Car", ["owner_email"], [auth.user_email]],
      })
      .then(({ data: cars }) => setMyCarsData(cars.data))
      .catch((error) => console.log(error));
  }, []);

  const nextPage = () => {
    if (indexPage === myCarsData.length - 1) {
      setIndexPage(0);
    } else {
      setIndexPage((prev) => (prev += 1));
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-inner-container">
        <h2>Welcome Back {auth.first_name}</h2>
        <div className="details-container">
          <div className="profile-left">
            <ul>
              <li
                className="profile-nav"
                onClick={() => setDisplayOverview(true)}
              >
                Overview
              </li>
              <li
                className="profile-nav"
                onClick={() => setDisplayOverview(false)}
              >
                My Cars
              </li>
            </ul>
          </div>
          <hr />
          <div className="profile-right">
            {displayOverview ? (
              <Overview iconsKey={iconsKey} />
            ) : (
              myCarsData && (
                <MyCars
                  myCarData={myCarsData[indexPage]}
                  iconsKey={iconsKey}
                  setIndexPage={setIndexPage}
                  indexPage={indexPage}
                  nextPage={nextPage}
                  setMyCarsData={setMyCarsData}
                  myCarsData={myCarsData}
                />
              )
            )}
          </div>
        </div>
        <div className="rating-panel-profile">
          <span>
            <i className="fas fa-star"></i>
            {auth.rating ? Number(auth.rating).toFixed(1) : 0} / 5
          </span>
          <span>|</span>
          <span>
            <i className="far fa-thumbs-up"></i>
            {auth.number_of_votes}
          </span>
        </div>
      </div>
    </div>
  );
}
