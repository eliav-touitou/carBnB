import React from "react";
import toyota from "../photos/toyota-logo.jpg";
import mazda from "../photos/mazda-logo.jpg";
import ford from "../photos/ford-logo.jpg";
import tesla from "../photos/tesla-logo.jpg";
import peugeot from "../photos/peugeot-logo.jpg";
import bmw from "../photos/bmw-logo.jpg";

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
          <div className="items-data">
            <img src={toyota} className="top-picks-img" />
            <h4>Toyota</h4>
          </div>
          <a className="arrow arrow-prev" href="#item-6"></a>
          <a className="arrow arrow-next" href="#item-2"></a>
        </div>

        <div className="carousel-item item-2">
          <div className="items-data">
            <img src={ford} className="top-picks-img" />
            <h4>Ford</h4>
          </div>
          <a className="arrow arrow-prev" href="#item-1"></a>
          <a className="arrow arrow-next" href="#item-3"></a>
        </div>

        <div className="carousel-item item-3">
          <div className="items-data">
            <img src={tesla} className="top-picks-img" />
            <h4>Tesla</h4>
          </div>
          <a className="arrow arrow-prev" href="#item-2"></a>
          <a className="arrow arrow-next" href="#item-4"></a>
        </div>
        <div className="carousel-item item-4">
          <div className="items-data">
            <img src={peugeot} className="top-picks-img" />
            <h4>Peugeot</h4>
          </div>
          <a className="arrow arrow-prev" href="#item-3"></a>
          <a className="arrow arrow-next" href="#item-5"></a>
        </div>
        <div className="carousel-item item-5">
          <div className="items-data">
            <img src={mazda} className="top-picks-img" />
            <h4>Mazda</h4>
          </div>
          <a className="arrow arrow-prev" href="#item-4"></a>
          <a className="arrow arrow-next" href="#item-6"></a>
        </div>
        <div className="carousel-item item-6">
          <div className="items-data">
            <img src={bmw} className="top-picks-img" />
            <h4>BMW</h4>
          </div>
          <a className="arrow arrow-prev" href="#item-5"></a>
          <a className="arrow arrow-next" href="#item-1"></a>
        </div>
      </div>
    </div>
  );
}
