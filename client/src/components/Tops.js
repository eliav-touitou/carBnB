import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FavoriteDetails from "./FavoriteDetails";
import { Link, useParams } from "react-router-dom";
import CarsBySelection from "./TopCars";

export default function Tops() {
  const { type } = useParams();

  const auth = useSelector((state) => state.auth);

  // Use State
  const [top, setTop] = useState();

  useEffect(() => {
    axios
      .get(`/api/v1/top/${type}`)
      .then(({ data: top }) => {
        setTop(top.data);
        console.log(top.data);
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <>
      {type === "cars" ? (
        <div className="car-favorite-page">
          <div className="favorite-car-list">
            {top?.map((car, i) => (
              <FavoriteDetails car={car} key={`car-${i}`} />
            ))}
          </div>
        </div>
      ) : type === "locations" ? (
        <div>
          {top?.map((city) => (
            <Link
              push={true}
              to={{
                pathname: `/top/city/${city}`,
                state: { city },
              }}
            >
              {city}
            </Link>
          ))}
        </div>
      ) : (
        <div>
          {top?.map((owner, i) => (
            <section key={`owner-${i}`} className={`owner-section ${i}`}>
              <h2>{owner.first_name + " " + owner.last_name}</h2>
              <div>City of hosting: {owner.address}</div>
              {/* <TopOwnerCars ownerEmail={owner.user_email} /> */}
              <div className="rating-panel-top-owner">
                <span>
                  <i className="fas fa-star"></i>
                  {owner.rating ? owner.rating : 0} / 5
                </span>
                <span>|</span>
                <span>
                  <i className="far fa-thumbs-up"></i>
                  {owner.number_of_votes}
                </span>
              </div>
              <Link
                push={true}
                to={{
                  pathname: `/top/ownercars/${owner.first_name}`,
                  state: { owner },
                }}
              >
                Cars of owner
              </Link>
              <hr />
            </section>
          ))}
        </div>
      )}
    </>
  );
}
