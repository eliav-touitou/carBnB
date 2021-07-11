import React, { useState } from "react";

export default function CarGallery({ photosArray }) {
  // Use states
  const [index, setIndex] = useState(0);

  const previousPhoto = () => {
    index !== 0
      ? setIndex((prev) => prev - 1)
      : setIndex(photosArray?.length - 1);
  };
  const nextPhoto = () => {
    index !== photosArray?.length - 1
      ? setIndex((prev) => prev + 1)
      : setIndex(0);
  };
  return (
    <div className="car-gallery">
      <button className="arrow prev" onClick={previousPhoto}>
        <i className="fas fa-angle-left"></i>
      </button>
      <img
        alt="car"
        src={`data:image/jpeg;base64,${photosArray[index]?.file}`}
      />
      <button className="arrow next" onClick={nextPhoto}>
        <i className="fas fa-angle-right"></i>
      </button>
    </div>
  );
}
