import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSpinner } from "../actions";
import FavoriteDetails from "./FavoriteDetails";

export default function MyFavorite() {
  const dispatch = useDispatch();

  // Redux states
  const auth = useSelector((state) => state.auth);

  // Use State
  const [myFavorite, setMyFavorite] = useState();

  useEffect(() => {
    dispatch(setSpinner(true));

    axios
      .post("/api/v1/favorite/all", { userEmail: auth.user_email })
      .then(({ data: favorite }) => {
        setMyFavorite(favorite.data);
        console.log(favorite.data);
        dispatch(setSpinner(false));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setSpinner(false));
      });
  }, []);

  return (
    <div className="car-favorite-page">
      <div className="favorite-car-list">
        {myFavorite?.map((car, i) => (
          <FavoriteDetails car={car} key={`car-${i}`} />
        ))}
      </div>
    </div>
  );
}
