import React, { useRef, useState } from "react";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setAuth, setSpinner } from "../actions";

export default function OverviewDetail({ iconsKey, keys, value }) {
  const dispatch = useDispatch();

  // Redux states
  const auth = useSelector((state) => state.auth);
  const allCitiesApi = useSelector((state) => state.allCitiesApi);

  // Use states
  const [isOpen, setIsOpen] = useState(false);

  // Use ref
  const inputRef = useRef();

  // Function for update user details
  const updateItem = async (keys, value) => {
    let arrToUpdateUser = [];
    let arrToUpdateAuth = [];
    let firstName = "";
    let lastName = "";

    if (keys === "first_name") {
      value = value.trim();
      firstName = value.split(" ")[0];
      lastName = value.split(" ")[1];
      arrToUpdateAuth = [
        "Auth",
        ["full_name"],
        auth.user_email,
        [`${firstName} ${lastName}`],
      ];
      arrToUpdateUser = [
        "User",
        ["first_name", "last_name"],
        auth.user_email,
        [firstName, lastName],
      ];
      try {
        dispatch(setSpinner(true));
        await axiosRequestToUpdate(arrToUpdateAuth);
        await axiosRequestToUpdate(arrToUpdateUser);
        await updateStates();
        dispatch(setSpinner(false));
      } catch (error) {
        console.log(error);
        dispatch(setSpinner(false));
      }
    } else {
      arrToUpdateUser = ["User", [keys], auth.user_email, [value]];
      try {
        dispatch(setSpinner(true));

        await axiosRequestToUpdate(arrToUpdateUser);
        await updateStates();
        dispatch(setSpinner(false));
      } catch (error) {
        console.log(error);
        dispatch(setSpinner(false));
      }
    }
  };

  // Get new details of the user
  const updateStates = async () => {
    try {
      // Get new details of the user
      const { data } = await axios.post("/api/v1/users/uniqueuser", {
        email: auth.user_email,
      });
      dispatch(setAuth(data.data));
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
        auth[keys] ? (
          <li className="overview-detail">
            <div className="data-and-icon">
              <span>{iconsKey[keys]}</span>
              <span> {value}</span>
            </div>
            <span className="pencil-profile">
              {keys === "user_email" ? null : (
                <>
                  <CreateOutlinedIcon onClick={() => setIsOpen(true)} />
                  <i
                    className="far fa-trash-alt"
                    onClick={() => {
                      updateItem(keys, null);
                    }}
                  ></i>
                </>
              )}
            </span>
          </li>
        ) : (
          <li className="add-new" onClick={() => setIsOpen(true)}>
            <div>
              <i className="fas fa-plus-circle"></i>{" "}
            </div>{" "}
            <span> Add {keys.replace("_", " ")} </span>
          </li>
        )
      ) : (
        <li className="overview-detail">
          <div className="data-and-icon">
            <span>{iconsKey[keys]}</span>
            {keys !== "address" ? (
              <input
                ref={inputRef}
                autoFocus={true}
                defaultValue={value}
              ></input>
            ) : (
              <>
                {" "}
                <input
                  name="cities-profile"
                  list="cities-profile"
                  ref={inputRef}
                  autoFocus={true}
                  defaultValue={value}
                ></input>
                <datalist id="cities-profile">
                  {allCitiesApi?.map((city, i) => (
                    <option key={`city-${i}`} value={city} />
                  ))}
                </datalist>{" "}
              </>
            )}
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
