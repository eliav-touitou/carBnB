import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import PromptLogin from "./PromptLogin";

export default function Rental() {
  // Use states
  const [image, setImage] = useState("");
  const [showLogin, setShowLogin] = useState(false);

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
        setShowLogin(true);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      {showLogin && <PromptLogin />}
      <div>
        <input
          className="upload-photo-rental"
          type="file"
          onChange={(e) => imageToBinary(e)}
        ></input>
      </div>
      <button onClick={SaveImage}>upload image</button>
      <img alt="license" src={`data:image/jpeg;base64,${image}`} />
    </div>
  );
}
