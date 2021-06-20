import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Rental() {
  // Use states
  const [image, setImage] = useState("");

  // Redux states
  const auth = useSelector((state) => state.auth);

  // Function to convert image to binary
  const imageToBinary = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log("Encoded Base 64 File String:", reader.result);
      const data = reader.result.split(",")[1];
      const binaryBlob = atob(data);
      setImage(data);
      console.log("Encoded Binary File String:", binaryBlob);
    };
    reader.readAsDataURL(file);
  };

  // Function to save license image into DB
  const SaveImage = async () => {
    try {
      // Need to change, (no to do it hardcoded)
      // const arr = [table, ["column"], "PK=user_email", [image]];
      if (auth) {
        const arr = ["User", ["license"], auth.user_email, [image]];
        await axios.post("api/v1/users/updateitems", { data: arr });
      } else {
        // need to prompt login promp component
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <div>
        <input
          className="upload-photo-rental"
          type="file"
          onChange={(e) => imageToBinary(e)}
        ></input>
      </div>
      <button onClick={SaveImage}>upload image</button>
      <img src={`data:image/jpeg;base64,${image}`} />
    </div>
  );
}
