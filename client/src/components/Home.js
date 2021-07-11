import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import SearchBar from "./SearchBar";
import { setAllCitiesApi } from "../actions";
import photo from "../photos/background-4593643_1920.jpg";
import topCar from "../photos/top-car.jpeg";
import topOwner from "../photos/top-owner.jpeg";
import topLocation from "../photos/top-location.jpeg";
import TopCarousel from "./TopCarousel";

import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(
        "https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=1271"
      )
      .then(({ data }) => {
        console.log(data);
        const temp = [];
        data.result.records?.forEach((city) => {
          if (city["שם_ישוב_לועזי"] !== " ") {
            temp.push(city["שם_ישוב_לועזי"].trim());
          }
        });
        dispatch(setAllCitiesApi(temp));
      });
  }, []);

  return (
    <div className="home-page-container">
      <section className="land-section">
        <img className="intro-img" height="50%" src={photo}></img>
        <h1>
          We invite you to start your journey with us, and with many other
          drivers
        </h1>
        <span>
          <a href="#search">Let's Start</a>
        </span>
      </section>

      <section className="search-section" id="search">
        <SearchBar />
      </section>
      <section className="top-pick-section">
        <h2>Choose the best</h2>
        <div className="top-picks-container">
          <div className="top-pick">
            <Link exact={"true"} to="/top/cars">
              <img src={topCar} className="top-car-img" />
              <h4>TOP CARS</h4>
              <p>Extraordinary driving experience. </p>
            </Link>
          </div>
          <div className="top-pick">
            <Link exact={"true"} to="/top/owners">
              <img src={topOwner} />
              <h4>TOP OWNERS</h4>
              <p>Lovely owner for the best travel. </p>
            </Link>
          </div>
          <div className="top-pick">
            <Link exact={"true"} to="/top/locations">
              <img src={topLocation} />
              <h4>TOP LOCATIONS</h4>
              <p>Peacefully moment in paradise. </p>
            </Link>
          </div>
        </div>
      </section>
      <TopCarousel />
      <section className="footer-section">
        <hr />
        <div className="upper-footer">
          <div className="support">
            <h4>Support</h4>
            <ul>
              <li>Contact us</li>
              <li>Cancellation Policy</li>
            </ul>
          </div>
          <div className="information">
            <h4>Info</h4>
            <ul>
              <li>How we started</li>
              <li>Service declaration</li>
              <li>About the Founders</li>
            </ul>
          </div>
        </div>
        <hr height="100px" />
        <footer className="footer">
          <div>
            <i className="fab fa-github"></i>
          </div>
          <div>
            <i className="fab fa-facebook-f"></i>
          </div>
          <div>
            <i className="far fa-envelope"></i>
          </div>
          <div>
            <i className="fab fa-linkedin"></i>
          </div>
          <p className="instagram">
            {" "}
            <i className="fab fa-instagram"></i>
          </p>
          <div className="copyright">© 2021 J.E.E</div>
        </footer>
      </section>
    </div>
  );
}
