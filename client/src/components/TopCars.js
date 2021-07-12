import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import { setSpinner } from "../actions";
import FavoriteDetails from "./FavoriteDetails";

export default function CarsBySelection() {
  const [ownerCars, setOwnerCars] = useState();
  const owner = useLocation()?.state?.owner;
  const city = useLocation()?.state?.city;
  const { brand } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (owner) {
      dispatch(setSpinner(true));
      axios
        .post("/api/v1/search/getitem", {
          data: ["Car", ["owner_email"], [owner.user_email]],
        })
        .then(({ data: cars }) => {
          setOwnerCars(cars.data);
          dispatch(setSpinner(false));
        })
        .catch((err) => {
          console.log(err);
          dispatch(setSpinner(false));
        });
    }
    if (city) {
      dispatch(setSpinner(true));

      axios
        .get(`/api/v1/cars/bycity/${city.city}`)
        .then(({ data: cars }) => {
          setOwnerCars(cars.data);
          dispatch(setSpinner(false));
        })
        .catch((err) => {
          console.log(err);
          dispatch(setSpinner(false));
        });
    }
    if (brand) {
      dispatch(setSpinner(true));
      axios
        .get(`/api/v1/top/brand/${brand}`)
        .then(({ data: cars }) => {
          setOwnerCars(cars.data);
          dispatch(setSpinner(false));
        })
        .catch((err) => {
          console.log(err);
          dispatch(setSpinner(false));
        });
    }
  }, [owner, city, brand]);

  return (
    <div className="top-page-car-results">
      <div className="top-container-car-results">
        {ownerCars?.map((car, i) => (
          <div className="top-owner-car">
            <FavoriteDetails car={car} key={`car-${i}`} />
          </div>
        ))}
      </div>
    </div>
  );
}
