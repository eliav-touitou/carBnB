import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import axios from "axios";
import { setAuth } from "../actions";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import EventBusyIcon from "@material-ui/icons/EventBusy";
import MyCars from "./MyCars";
import AirlineSeatReclineNormalTwoToneIcon from "@material-ui/icons/AirlineSeatReclineNormalTwoTone";
import LabelOutlinedIcon from "@material-ui/icons/LabelOutlined";

export default function Profile() {
  const dispatch = useDispatch();
  const iconsKey = {
    brand: <i class="fas fa-car-side"></i>,
    year: <i class="far fa-calendar-alt"></i>,
    fuel: <i class="fas fa-gas-pump"></i>,
    price_per_day: <i class="fas fa-dollar-sign"></i>,
    gear: <i class="fas fa-cogs"></i>,
    available_from: <EventAvailableIcon />,
    available_until: <EventBusyIcon />,
    passengers: <AirlineSeatReclineNormalTwoToneIcon />,
    model: <LabelOutlinedIcon />,
    discount_for_week: <i class="fas fa-percent"></i>,
    discount_for_month: <i class="fas fa-percent"></i>,
  };

  // Redux states
  const auth = useSelector((state) => state.auth);

  // Use states
  const [modifyNamesInput, setModifyNamesInput] = useState(false);
  const [modifyEmailInput, setModifyEmailInput] = useState(false);
  const [modifyAddressInput, setModifyAddressInput] = useState(false);
  const [modifyPhoneInput, setModifyPhoneInput] = useState(false);
  const [myCarsData, setMyCarsData] = useState();
  const [displayOverview, setDisplayOverview] = useState(true);

  useEffect(() => {
    axios
      .post("/api/v1/search/getitem", {
        data: ["Car", ["owner_email"], [auth.user_email]],
      })
      .then(({ data: cars }) => setMyCarsData(cars.data))
      .catch((error) => console.log(error));
  }, []);

  // Use refs
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();

  // Function for update name of user
  // ---------------------------⬇⬇⬇⬇⬇⬇⬇⬇ need to finish ⬇⬇⬇⬇⬇⬇⬇⬇------------------------------------ //
  // Need to update name in all tables
  const updateNames = async (keysArr, valuesArr) => {
    if (valuesArr[0] === undefined || valuesArr[0].trim() === "") {
      valuesArr[0] = auth.first_name;
    }
    if (valuesArr[1] === undefined || valuesArr[1].trim() === "") {
      valuesArr[1] = auth.last_name;
    }

    const arrToUpdateAuth = [
      "Auth",
      ["full_name"],
      auth.user_email,
      [`${valuesArr[0]} ${valuesArr[1]}`],
    ];
    const arrToUpdateUser = ["User", keysArr, auth.user_email, valuesArr];
    try {
      await axios.post("/api/v1/users/updateitems", {
        data: arrToUpdateAuth,
      });
      await axios.post("/api/v1/users/updateitems", {
        data: arrToUpdateUser,
      });
      const { data } = await axios.post("/api/v1/users/uniqueuser", {
        email: auth.user_email,
      });

      dispatch(setAuth(data.data));
    } catch (error) {
      console.log(error);
    }
  };

  // Function for update email of user
  // ---------------------------⬇⬇⬇⬇⬇⬇⬇⬇ need to finish ⬇⬇⬇⬇⬇⬇⬇⬇------------------------------------ //
  // Need to update email in all tables
  const updateEmail = async (keysArr, valuesArr) => {
    let arrToUpdateAuth = [];
    let arrToUpdateUser = [];
    if (valuesArr[0].trim() !== "") {
      arrToUpdateAuth = ["Auth", keysArr, auth.user_email, valuesArr];
      arrToUpdateUser = ["User", keysArr, auth.user_email, valuesArr];
      try {
        await axios.post("/api/v1/users/updateitems", {
          data: arrToUpdateAuth,
        });
        await axios.post("/api/v1/users/updateitems", {
          data: arrToUpdateUser,
        });
        const { data } = await axios.post("/api/v1/users/uniqueuser", {
          email: arrToUpdateAuth[3][0],
        });

        dispatch(setAuth(data.data));
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Function for update address of user
  // ---------------------------⬇⬇⬇⬇⬇⬇⬇⬇ need to finish ⬇⬇⬇⬇⬇⬇⬇⬇------------------------------------ //
  // Need to update address in all tables (like rentals)
  const updateAddress = async (keysArr, valuesArr) => {
    let arrToUpdateUser = [];
    if (valuesArr[0].trim() !== "") {
      arrToUpdateUser = ["User", keysArr, auth.user_email, valuesArr];

      try {
        await axios.post("/api/v1/users/updateitems", {
          data: arrToUpdateUser,
        });
        const { data } = await axios.post("/api/v1/users/uniqueuser", {
          email: auth.user_email,
        });

        dispatch(setAuth(data.data));
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Function for update phone of user
  const updatePhone = async (keysArr, valuesArr) => {
    let arrToUpdateUser = [];
    if (valuesArr[0].trim() !== "") {
      arrToUpdateUser = ["User", keysArr, auth.user_email, valuesArr];

      try {
        await axios.post("/api/v1/users/updateitems", {
          data: arrToUpdateUser,
        });
        const { data } = await axios.post("/api/v1/users/uniqueuser", {
          email: auth.user_email,
        });

        dispatch(setAuth(data.data));
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-inner-container">
        <h2>Welcome Back {auth.first_name}</h2>
        <div className="details-container">
          <div className="profile-left">
            <ul>
              <li
                className="profile-nav"
                onClick={() => setDisplayOverview(true)}
              >
                Overview
              </li>
              <li
                className="profile-nav"
                onClick={() => setDisplayOverview(false)}
              >
                My Cars
              </li>
            </ul>
          </div>
          <hr />
          <div className="profile-right">
            {displayOverview ? (
              <ul>
                {!modifyNamesInput ? (
                  <li>
                    <div>
                      <i className="far fa-user"></i>{" "}
                      <span className="first-name-profile">
                        {auth.first_name}
                      </span>{" "}
                      <span className="last-name-profile">
                        {auth.last_name}
                      </span>{" "}
                    </div>
                    <span className="pencil-profile">
                      <CreateOutlinedIcon
                        onClick={() => setModifyNamesInput(true)}
                      />
                    </span>{" "}
                  </li>
                ) : (
                  <li>
                    <div>
                      <input
                        ref={firstNameRef}
                        defaultValue={auth.first_name}
                      ></input>{" "}
                      <input
                        ref={lastNameRef}
                        defaultValue={auth.last_name}
                      ></input>
                    </div>{" "}
                    <span className="pencil-profile">
                      <i
                        className="fas fa-check"
                        onClick={() => {
                          setModifyNamesInput(false);
                          updateNames(
                            ["first_name", "last_name"],
                            [
                              firstNameRef.current.value,
                              lastNameRef.current.value,
                            ]
                          );
                        }}
                      ></i>
                      <i
                        className="fas fa-times"
                        onClick={() => setModifyNamesInput(false)}
                      ></i>
                    </span>{" "}
                  </li>
                )}

                {!modifyEmailInput ? (
                  <li>
                    <div>
                      <i className="far fa-envelope"></i> {auth.user_email}{" "}
                    </div>
                    <span className="pencil-profile">
                      <CreateOutlinedIcon
                        onClick={() => setModifyEmailInput(true)}
                      />
                    </span>{" "}
                  </li>
                ) : (
                  <li>
                    <div>
                      <input
                        ref={emailRef}
                        defaultValue={auth.user_email}
                      ></input>{" "}
                    </div>{" "}
                    <span className="pencil-profile">
                      <i
                        className="fas fa-check"
                        onClick={() => {
                          setModifyEmailInput(false);
                          updateEmail(["user_email"], [emailRef.current.value]);
                        }}
                      ></i>
                      <i
                        className="fas fa-times"
                        onClick={() => setModifyEmailInput(false)}
                      ></i>
                    </span>{" "}
                  </li>
                )}

                {auth.address ? (
                  !modifyAddressInput ? (
                    <li>
                      <div>
                        <i className="fas fa-map-marker-alt"></i> {auth.address}{" "}
                      </div>
                      <span className="pencil-profile">
                        <CreateOutlinedIcon
                          onClick={() => setModifyAddressInput(true)}
                        />
                      </span>{" "}
                    </li>
                  ) : (
                    <li>
                      <div>
                        <input
                          ref={addressRef}
                          defaultValue={auth.address}
                        ></input>{" "}
                      </div>{" "}
                      <span className="pencil-profile">
                        <i
                          className="fas fa-check"
                          onClick={() => {
                            setModifyAddressInput(false);
                            updateAddress(
                              ["address"],
                              [addressRef.current.value]
                            );
                          }}
                        ></i>
                        <i
                          className="fas fa-times"
                          onClick={() => setModifyAddressInput(false)}
                        ></i>
                      </span>{" "}
                    </li>
                  )
                ) : (
                  <li className="add-new">
                    <div>
                      <i className="fas fa-plus-circle"></i>{" "}
                    </div>{" "}
                    <span> Add Address </span>
                  </li>
                )}

                {auth.phone_number ? (
                  !modifyPhoneInput ? (
                    <li>
                      <div>
                        <i className="fas fa-phone-alt"></i>
                      </div>
                      {auth.phone_number}{" "}
                      <span className="pencil-profile">
                        <CreateOutlinedIcon
                          onClick={() => setModifyPhoneInput(true)}
                        />
                      </span>{" "}
                    </li>
                  ) : (
                    <li>
                      <div>
                        <input
                          ref={phoneRef}
                          defaultValue={auth.phone_number}
                        ></input>{" "}
                      </div>{" "}
                      <span className="pencil-profile">
                        <i
                          className="fas fa-check"
                          onClick={() => {
                            setModifyPhoneInput(false);
                            updatePhone(
                              ["phone_number"],
                              [phoneRef.current.value]
                            );
                          }}
                        ></i>
                        <i
                          className="fas fa-times"
                          onClick={() => setModifyPhoneInput(false)}
                        ></i>
                      </span>{" "}
                    </li>
                  )
                ) : !modifyPhoneInput ? (
                  <li
                    className="add-new"
                    onClick={() => setModifyPhoneInput(true)}
                  >
                    <div>
                      <i className="fas fa-plus-circle"></i>{" "}
                    </div>{" "}
                    <span> Add Phone number </span>
                  </li>
                ) : (
                  <li>
                    <div>
                      <input
                        ref={phoneRef}
                        defaultValue={auth.phone_number}
                      ></input>{" "}
                    </div>{" "}
                    <span className="pencil-profile">
                      <i
                        className="fas fa-check"
                        onClick={() => {
                          setModifyPhoneInput(false);
                          updatePhone(
                            ["phone_number"],
                            [phoneRef.current.value]
                          );
                        }}
                      ></i>
                      <i
                        className="fas fa-times"
                        onClick={() => setModifyPhoneInput(false)}
                      ></i>
                    </span>{" "}
                  </li>
                )}
              </ul>
            ) : (
              myCarsData?.map((myCar) => (
                <MyCars myCar={myCar} iconsKey={iconsKey} />
              ))
            )}
          </div>
        </div>
        <div className="rating-panel-profile">
          <span>
            <i className="fas fa-star"></i>
            {auth.rating ? auth.rating : 0} / 5
          </span>
          <span>|</span>
          <span>
            <i className="far fa-thumbs-up"></i>
            {auth.number_of_votes}
          </span>
        </div>
      </div>
    </div>
  );
}
