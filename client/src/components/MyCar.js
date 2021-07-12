import React, { useRef, useState } from "react";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSpinner } from "../actions";

export default function MyCar({ iconsKey, keys, value, carId, setMyCarsData }) {
  const includesCondition = ["available", "discount", "price"];
  const dispatch = useDispatch();

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
      dispatch(setSpinner(true));
      await axiosRequestToUpdate(arrToUpdateUser);
      await updateStates();
      dispatch(setSpinner(false));
    } catch (error) {
      console.log(error);
      dispatch(setSpinner(false));
    }
  };

  ///////////////// ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇ need to display the new details after update⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇ //////////////
  const updateStates = async () => {
    dispatch(setSpinner(true));
    try {
      const { data: cars } = await axios.post("/api/v1/search/getitem", {
        data: ["Car", ["owner_email"], [auth.user_email]],
      });
      setMyCarsData(cars.data);
      setIsOpen(false);
      dispatch(setSpinner(false));
    } catch (error) {
      console.log(error);
      dispatch(setSpinner(false));
    }
  };

  // Axios request
  const axiosRequestToUpdate = async (arr) => {
    dispatch(setSpinner(true));
    try {
      await axios.post("/api/v1/users/updateitems", {
        data: arr,
      });
      dispatch(setSpinner(false));
    } catch (error) {
      console.log(error);
      dispatch(setSpinner(false));
    }
  };

  return (
    <>
      {!isOpen ? (
        <li>
          <div className="data-and-icon">
            <span>{iconsKey[keys]}</span>
            <span> {value}</span>
          </div>
          <span className="pencil-profile">
            {includesCondition.some((el) => keys.includes(el)) && (
              <CreateOutlinedIcon onClick={() => setIsOpen(true)} />
            )}
          </span>
        </li>
      ) : (
        <li>
          <div className="data-and-icon">
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
