// import axios from "axios";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPhotosArray } from "../actions";

export default function Rental({ id }) {
  const [images, setImages] = useState([]);

  // Use states
  // Redux states
  const photosArray = useSelector((state) => state.photosArray);
  // const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPhotosArray(images));
  }, [images]);

  // useEffect(() => {
  // axios.post()
  // }, [])

  const imageToBinary = async (e) => {
    const filesList = Array.from(e.target.files);

    filesList?.forEach(async (file) => {
      const reader = new FileReader();
      reader.onloadend = async () => {
        // console.log("Encoded Base 64 File String:", reader.result);
        const data = await reader.result.split(",")[1];
        // const binaryBlob = atob(data);
        // console.log("Encoded Binary File String:", binaryBlob);
        setImages((prev) => [...prev, { file: data }]);
        // dispatch(setPhotosArray();
      };
      reader.readAsDataURL(file);
    });
  };
  // Function to save license image into DB
  // const SaveImage = async () => {
  //   try {
  // Need to change, (no to do it hardcoded)
  // const arr = [table, ["column"], "PK=user_email", [image]];
  // if (auth) {
  // } else {
  //   // need to prompt login promp component
  // }
  //     await axios.post("api/v1/photos/savephotos", imagesArray);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
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
