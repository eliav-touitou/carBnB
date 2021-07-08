import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FavoriteDetails from "./FavoriteDetails";

export default function CarsBySelection() {
  const [ownerCars, setOwnerCars] = useState();
  const { owner, city } = useLocation().state;

  useEffect(() => {
    if (owner) {
      axios
        .post("/api/v1/search/getitem", {
          data: ["Car", ["owner_email"], [owner.user_email]],
        })
        .then(({ data: cars }) => {
          setOwnerCars(cars.data);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .get(`/api/v1/cars/bycity/${city}`)
        .then(({ data: cars }) => {
          setOwnerCars(cars.data);
        })
        .catch((err) => console.log(err));
    }
  }, [owner, city]);

  return (
    <div>
      {ownerCars?.map((car, i) => (
        <div className="top-owner-car">
          <FavoriteDetails car={car} key={`car-${i}`} />
        </div>
      ))}
    </div>
  );
}
