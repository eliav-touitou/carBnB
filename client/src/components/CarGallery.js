import React, { useState } from "react";

export default function CarGallery({ photosArray, location }) {
  const [index, setIndex] = useState(0);
  const previousPhoto = () => {
    index !== 0
      ? setIndex((prev) => prev - 1)
      : setIndex(photosArray.length - 1);
  };
  const nextPhoto = () => {
    index !== photosArray.length - 1
      ? setIndex((prev) => prev + 1)
      : setIndex(0);
  };
  return (
    <div className="car-gallery">
      <button className="arrow prev" onClick={previousPhoto}></button>
      <img
        alt="car"
        src={`data:image/jpeg;base64,${photosArray[index].file}`}
      />
      <button className="arrow next" onClick={nextPhoto}></button>
    </div>
  );
}
