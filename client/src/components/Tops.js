import axios from "axios";
import React, { useEffect, useState } from "react";
import FavoriteDetails from "./FavoriteDetails";
import { Link, useParams } from "react-router-dom";
import photoOwnerCar from "../photos/top-owner-car.jpeg";
import { setSpinner } from "../actions";
import { useDispatch } from "react-redux";

import city1 from "../photos/city1.jpeg";
import city2 from "../photos/city2.jpeg";
import city3 from "../photos/city3.jpeg";
import city4 from "../photos/city4.jpeg";
import city5 from "../photos/city5.jpeg";
export default function Tops() {
  const dispatch = useDispatch();

  const { type } = useParams();
  const stamMishpat = `located in the unique landscape of Israel, and offers a special opportunity to travel, enjoy and absorb  the local culture.`;
  const sentence1 = `" I enjoy being a part of carBnB host's team. there is nothing that makes me feel better then seeing a satisfied guest. "`;
  const sentence2 = `" Since my family and i became car hosts, we got the opportunity to benefit from extra time together, while helping guests in our city to find a good, comfortable and cheap alternative to car rentals companies. "`;
  const sentence3 = `" I invite all the visitors of my city to join many other  guests that already enjoyed driving my cars through the wonderful local landscape. "`;
  const sentence4 = `" CarBnB gave me the possibility to benefit from my unused cars, and help others in the same time. "`;
  const sentence5 = `" With the great experience of carBnB, i got the opportunity to offer my car to whoever needs it for a great deal and make everyone satisfied. "`;

  // Use State
  const [top, setTop] = useState();
  const [photoOfCitiesArr, setPhotoOfCitiesArr] = useState([
    city1,
    city2,
    city3,
    city4,
    city5,
  ]);
  const [randomSentenceForUsersArr, setRandomSentenceForUsersArr] = useState([
    sentence1,
    sentence2,
    sentence3,
    sentence4,
    sentence5,
  ]);

  useEffect(() => {
    dispatch(setSpinner(true));
    axios
      .get(`/api/v1/top/${type}`)
      .then(({ data: top }) => {
        setTop(top.data);
        console.log(top.data);
        dispatch(setSpinner(false));
      })
      .catch((err) => {
        console.log(err.message);
        dispatch(setSpinner(false));
      });
  }, []);

  useEffect(() => {
    for (let i = photoOfCitiesArr.length - 1; i > 0; i--) {
      let rand = Math.floor(Math.random() * (i + 1));
      [photoOfCitiesArr[i], photoOfCitiesArr[rand]] = [
        photoOfCitiesArr[rand],
        photoOfCitiesArr[i],
      ];
      [randomSentenceForUsersArr[i], randomSentenceForUsersArr[rand]] = [
        randomSentenceForUsersArr[rand],
        randomSentenceForUsersArr[i],
      ];
    }
    setRandomSentenceForUsersArr(randomSentenceForUsersArr);
    setPhotoOfCitiesArr(photoOfCitiesArr);
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
        <div className="top-city-div">
          {top?.map((city, i) => (
            <section key={`city-${i}`} className={`city-section ${i}`}>
              <div>
                <link
                  rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />
                <div id="container">
                  <div className="product-details product-details-city">
                    <h1>{city.city}</h1>
                    <p className="information top-city-information">
                      {city.description
                        ? city.description
                        : `${
                            city.city.substring(0, 1).toUpperCase() +
                            city.city.substring(1).toLowerCase()
                          } is ${stamMishpat}`}
                    </p>
                    <Link
                      push={true}
                      to={{
                        pathname: `/top/city/${city.city}`,
                        state: { city },
                      }}
                    >
                      <div className="control">
                        <button className="btn">
                          <span className="price">🚗</span>
                          <span className="shopping-cart">
                            <i
                              className="fa fa-shopping-cart"
                              aria-hidden="true"
                            />
                          </span>
                          <span className="buy">Cars Collection</span>
                        </button>
                      </div>
                    </Link>
                  </div>
                  <div className="product-image">
                    <img src={photoOfCitiesArr[i]} alt="" />
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="top-owner-div">
          {top?.map((owner, i) => (
            <section key={`owner-${i}`} className={`owner-section ${i}`}>
              <div>
                <link
                  rel="stylesheet"
                  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
                />
                <div id="container">
                  <div className="product-details">
                    <h1>{owner.first_name + " " + owner.last_name}</h1>
                    <span className="hint-star star">
                      <i
                        className={`fa fa-star${owner.rating >= 1 ? "" : "-o"}`}
                        aria-hidden={true}
                      />
                      <i
                        className={`fa fa-star${owner.rating >= 2 ? "" : "-o"}`}
                        aria-hidden={true}
                      />
                      <i
                        className={`fa fa-star${owner.rating >= 3 ? "" : "-o"}`}
                        aria-hidden={true}
                      />
                      <i
                        className={`fa fa-star${owner.rating >= 4 ? "" : "-o"}`}
                        aria-hidden={true}
                      />
                      <i
                        className={`fa fa-star${owner.rating >= 5 ? "" : "-o"}`}
                        aria-hidden={true}
                      />
                    </span>
                    <p className="information top-car-information">
                      {randomSentenceForUsersArr[i]}
                    </p>
                    <Link
                      push={true}
                      to={{
                        pathname: `/top/ownercars/${owner.first_name}`,
                        state: { owner },
                      }}
                    >
                      <div className="control">
                        <button className="btn">
                          <span className="price">🚗</span>
                          <span className="shopping-cart">
                            <i
                              className="fa fa-shopping-cart"
                              aria-hidden="true"
                            />
                          </span>
                          <span className="buy">Cars Collection</span>
                        </button>
                      </div>
                    </Link>
                  </div>
                  <div className="product-image">
                    <img src={photoOwnerCar} alt="" />
                    <div className="info">
                      <h2> Description</h2>
                      <ul>
                        <li>City of hosting {owner.address}</li>
                        <li>
                          Joined us on{" "}
                          {new Date(owner.createdAt).toDateString()}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
