import React, { useEffect, useRef, useState } from "react";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import { useSelector } from "react-redux";
import axios from "axios";

export default function MyCar({
  iconsKey,
  keys,
  value,
  carId,
  setMyCarsData,
  myCarsData,
}) {
  const includesCondition = ["available", "discount", "price"];
  // Redux states
  const auth = useSelector((state) => state.auth);

  // Use states
  const [isOpen, setIsOpen] = useState(false);

  // Use ref
  const inputRef = useRef();

  // Function for update user details
  const updateItem = async (keys, value) => {
    value = value.trim();
    if (keys.includes("discount")) {
      if (!value.includes("%")) {
        alert("must be % sign");
        return;
      }
    }
    let arrToUpdateUser = ["Car", [keys], carId, [value]];
    try {
      await axiosRequestToUpdate(arrToUpdateUser);
      await updateStates();
    } catch (error) {
      console.log(error);
    }
  };

  ///////////////// ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇ need to display the new details after update⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇ //////////////
  const updateStates = async () => {
    try {
      const { data: cars } = await axios.post("/api/v1/search/getitem", {
        data: ["Car", ["owner_email"], [auth.user_email]],
      });
      setMyCarsData(cars.data);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Axios request
  const axiosRequestToUpdate = async (arr) => {
    try {
      await axios.post("/api/v1/users/updateitems", {
        data: arr,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!isOpen ? (
        <li>
          <div>
            {iconsKey[keys]}
            <span> {value}</span>
            <span className="pencil-profile">
              {includesCondition.some((el) => keys.includes(el)) && (
                <CreateOutlinedIcon onClick={() => setIsOpen(true)} />
              )}
            </span>
          </div>
        </li>
      ) : (
        <li>
          <div>
            <span>{iconsKey[keys]}</span>
            <input ref={inputRef} autoFocus={true} defaultValue={value}></input>
          </div>{" "}
          <span className="pencil-profile">
            <i
              className="fas fa-check"
              onClick={() => updateItem(keys, inputRef.current.value)}
            ></i>
            <i
              className="fas fa-times"
              onClick={() => {
                setIsOpen(false);
              }}
            ></i>
          </span>{" "}
        </li>
      )}
    </>
  );
}
