import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import FavoriteDetails from "./FavoriteDetails";
import { Link, useParams } from "react-router-dom";
import CarsBySelection from "./TopCars";
import photoOwnerCar from "../photos/top-owner-car.jpeg";

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
                    <p className="information">
                      " Let's spread the joy , here is Christmas , the most
                      awaited day of the year.Christmas Tree is what one need
                      the most. Here is the correct tree which will enhance your
                      Christmas."
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
                        {/* <li>
                          <strong>Decoration: </strong>balls and bells
                        </li>
                        <li>
                          <strong>Material: </strong>Eco-Friendly
                        </li> */}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* <h2>{owner.first_name + " " + owner.last_name}</h2> */}
              {/* <div>City of hosting: {owner.address}</div> */}
              {/* <TopOwnerCars ownerEmail={owner.user_email} /> */}
              {/* <div className="rating-panel-top-owner">
                <span>
                  <i className="fas fa-star"></i> */}
              {/* {owner.rating ? owner.rating : 0} / 5 */}
              {/* </span>
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
              <hr /> */}
            </section>
          ))}
        </div>
      )}
    </>
  );
}
