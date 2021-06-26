// import axios from "axios";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setPhotosArray } from "../actions";

export default function Rental({ id }) {
  const [images, setImages] = useState([]);

  // Use states

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPhotosArray(images));
  }, [images]);

  const imageToBinary = async (e) => {
    const filesList = Array.from(e.target.files);

    filesList?.forEach(async (file) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const data = await reader.result.split(",")[1];

        setImages((prev) => [...prev, { file: data }]);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div>
      <div>
        <input
          className="upload-photo-rental"
          type="file"
          onChange={(e) => imageToBinary(e)}
          multiple
        ></input>
      </div>
      {images?.map((photo, i) => (
        <img
          alt="license"
          key={`photo-${i}`}
          src={`data:image/jpeg;base64,${photo.file}`}
          height={100}
        />
      ))}
    </div>
  );
}
