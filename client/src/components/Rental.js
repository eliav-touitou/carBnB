import axios from "axios";
import React, { useState } from "react";

export default function Rental() {
  const [image, setImage] = useState("");
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

  const SaveImage = async () => {
    // table: User,
    //   column: ["first_name", "last_name"],
    //   primaryKey: "user_email",
    //   primaryKeyValue: "eliav@gmail.com",
    //   content: ["mose", "levy"],

    try {
      const arr = ["User", ["license"], "eliav@gmail.com", [image]];
      await axios.post("api/v1/users/updateitems", { data: arr });
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
