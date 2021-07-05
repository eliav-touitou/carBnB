import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FavoriteDetails from "./FavoriteDetails";

export default function MyFavorite() {
  const auth = useSelector((state) => state.auth);

  // Use State
  const [myFavorite, setMyFavorite] = useState();

  useEffect(() => {
    axios
      .post("/api/v1/favorite/all", { userEmail: auth.user_email })
      .then(({ data: favorite }) => {
        setMyFavorite(favorite.data);
        console.log(favorite.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      {myFavorite?.map((car, i) => (
        <div key={`car-${i}`}>
          <FavoriteDetails car={car} key={`car-${i}`} />
        </div>
      ))}
    </div>
  );
}
