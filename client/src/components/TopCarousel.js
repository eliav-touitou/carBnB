import React from "react";
import toyota from "../photos/toyota-logo.jpg";
import mazda from "../photos/mazda-logo.jpg";
import ford from "../photos/ford-logo.jpg";
import tesla from "../photos/tesla-logo.jpg";
import peugeot from "../photos/peugeot-logo.jpg";
import bmw from "../photos/bmw-logo.jpg";
import { Link } from "react-router-dom";

export default function TopCarousel() {
  return (
    <div className="top-pick-carousel">
      <h2>Popular Brands</h2>
      <div className="carousel-wrapper">
        <span id="item-1"></span>
        <span id="item-2"></span>
        <span id="item-3"></span>
        <span id="item-4"></span>
        <span id="item-5"></span>
        <span id="item-6"></span>
        <div className="carousel-item item-1">
          <Link push={true} to="/top/car/TOYOTA">
            <div className="items-data">
              <img src={toyota} className="top-picks-img" />
            </div>
          </Link>
          <a className="arrow arrow-prev" href="#item-6"></a>
          <a className="arrow arrow-next" href="#item-2"></a>
        </div>

        <div className="carousel-item item-2">
          <Link push={true} to="/top/car/FORD">
            <div className="items-data">
              <img src={ford} className="top-picks-img" />
            </div>
          </Link>
          <a className="arrow arrow-prev" href="#item-1"></a>
          <a className="arrow arrow-next" href="#item-3"></a>
        </div>

        <div className="carousel-item item-3">
          <Link push={true} to="/top/car/TESLA">
            <div className="items-data">
              <img src={tesla} className="top-picks-img" />
            </div>
          </Link>
          <a className="arrow arrow-prev" href="#item-2"></a>
          <a className="arrow arrow-next" href="#item-4"></a>
        </div>
        <div className="carousel-item item-4">
          <Link push={true} to="/top/car/PEUGEOT">
            <div className="items-data">
              <img src={peugeot} className="top-picks-img" />
            </div>
          </Link>
          <a className="arrow arrow-prev" href="#item-3"></a>
          <a className="arrow arrow-next" href="#item-5"></a>
        </div>
        <div className="carousel-item item-5">
          <Link push={true} to="/top/car/MAZDA">
            <div className="items-data">
              <img src={mazda} className="top-picks-img" />
            </div>
          </Link>
          <a className="arrow arrow-prev" href="#item-4"></a>
          <a className="arrow arrow-next" href="#item-6"></a>
        </div>
        <div className="carousel-item item-6">
          <Link push={true} to="/top/car/BMW">
            <div className="items-data">
              <img src={bmw} className="top-picks-img" />
            </div>
          </Link>
          <a className="arrow arrow-prev" href="#item-5"></a>
          <a className="arrow arrow-next" href="#item-1"></a>
        </div>
      </div>
    </div>
  );
}
