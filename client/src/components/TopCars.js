import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import FavoriteDetails from "./FavoriteDetails";

export default function CarsBySelection() {
  const [ownerCars, setOwnerCars] = useState();
  const owner = useLocation()?.state?.owner;
  const city = useLocation()?.state?.city;
  const { brand } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (owner) {
      axios
        .post("/api/v1/search/getitem", {
          data: ["Car", ["owner_email"], [owner.user_email]],
        })
        .then(({ data: cars }) => {
          setOwnerCars(cars.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (city) {
      axios
        .get(`/api/v1/cars/bycity/${city.city}`)
        .then(({ data: cars }) => {
          setOwnerCars(cars.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (brand) {
      console.log(brand);
      axios
        .get(`/api/v1/top/brand/${brand}`)
        .then(({ data: cars }) => {
          console.log(cars);
          setOwnerCars(cars.data);
        })
        .catch((err) => {
          console.log(err);
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
