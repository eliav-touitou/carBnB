import React from "react";
import topCar from "../photos/car-round-top.jpg";
import topOwner from "../photos/top-owner-blonde.jpg";
import topLocation from "../photos/top-location-2.jpg";
// import TopPicks from "./TopPicks";

export default function TopCarousel() {
  return (
    <div className="top-pick-carousel">
      <h2>Choose the best</h2>
      <div className="carousel-wrapper">
        <span id="item-1"></span>
        <span id="item-2"></span>
        <span id="item-3"></span>
        <div className="carousel-item item-1">
          <div className="items-data">
            <img src={topCar} className="top-picks-img" />
            <h4>TOP CARS</h4>
            <p>Extraordinary driving experience. </p>
          </div>
          <a className="arrow arrow-prev" href="#item-3"></a>
          <a className="arrow arrow-next" href="#item-2"></a>
        </div>

        <div className="carousel-item item-2">
          <div className="items-data">
            <img src={topOwner} className="top-picks-img" />
            <h4>TOP OWNERS</h4>
            <p>Lovely owner for the best travel. </p>
          </div>
          <a className="arrow arrow-prev" href="#item-1"></a>
          <a className="arrow arrow-next" href="#item-3"></a>
        </div>

        <div className="carousel-item item-3">
          <div className="items-data">
            <img src={topLocation} className="top-picks-img" />
            <h4>TOP LOCATIONS</h4>
            <p>Peacefully moment in paradise. </p>
          </div>
          <a className="arrow arrow-prev" href="#item-2"></a>
          <a className="arrow arrow-next" href="#item-1"></a>
        </div>
      </div>
    </div>
  );
}
