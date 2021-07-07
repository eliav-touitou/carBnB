import React from "react";

export default function CarGallery({ photosArray, location }) {
  return (
    <div className={`top-pick-carousel-${location}`}>
      <div className={`carousel-wrapper-${location}`}>
        {photosArray?.map((photo, i) => (
          <>
            <style>
              {i !== 0
                ? `
                #item-${i + 1}:target ~ .item-${i + 1} {
                z-index: 3;
                opacity: 1;
                 }`
                : ` #item-1:target ~ .item-1 {
                 opacity: 1;
                 }`}
            </style>
            <span id={`item-${i + 1}`}></span>
          </>
        ))}
        {photosArray?.map((photo, i) => (
          <div
            key={`photo-outer-${i}`}
            className={
              i === 0
                ? `carousel-item item-${i + 1}`
                : `carousel-item item-${i + 1} secondaries`
            }
          >
            <div className="items-data">
              <img
                alt="license"
                key={`photo-${i}`}
                src={`data:image/jpeg;base64,${photo.file}`}
                height="100%"
              />
            </div>
            <a
              className="arrow arrow-prev"
              href={i !== 0 ? `#item-${i}` : `#item-${photosArray.length}`}
              onClick={(e) => console.log(e.target)}
            ></a>
            <a
              className="arrow arrow-next"
              href={i + 1 === photosArray.length ? "#item-1" : `#item-${i + 2}`}
              onClick={(e) => console.log(e.target)}
            ></a>
          </div>
        ))}{" "}
      </div>
    </div>
  );
}
