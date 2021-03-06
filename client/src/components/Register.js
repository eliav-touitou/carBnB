import axios from "axios";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowLogin, setSpinner } from "../actions";

export default function Register() {
  const dispatch = useDispatch();

  // UseRefs
  const passwordRef = useRef();
  const passwordValidationRef = useRef();

  // Redux states
  const auth = useSelector((state) => state.auth);

  // Use Effect
  useEffect(() => {
    if (auth) dispatch(setShowLogin(false));
  }, [auth]);

  // Function to save new user to database
  const addNewUser = async (e) => {
    const form = e.target;
    e.preventDefault();
    if (passwordRef.current.value !== passwordValidationRef.current.value) {
      alert("Passwords doesn't match");
    }
    try {
      dispatch(setSpinner(true));
      const formData = new FormData(form);
      const user = {};
      for (let [key, value] of formData.entries()) {
        user[key] = value;
        console.log([key, value]);
      }
      user.password = passwordRef.current.value;
      await axios.post("/api/v1/users/register", { newUser: user });
      console.log("User Saved!");
      dispatch(setSpinner(false));
    } catch (error) {
      console.log(error);
      dispatch(setSpinner(false));
    }
  };

  return (
    <div className="form-container sign-up-container">
      <div
        className="x register"
        onClick={() => {
          dispatch(setShowLogin(false));
        }}
      >
        ✖
      </div>
      <form id="register" onSubmit={addNewUser}>
        <h1 className="login-form-title">Create Account</h1>
        <input
          className="login-form-input"
          name="email"
          type="email"
          placeholder="* Email"
          required
        ></input>
        <input
          className="login-form-input"
          name="firstName"
          type="text"
          placeholder="* Enter first name"
          required
        ></input>
        <input
          className="login-form-input"
          name="lastName"
          type="text"
          placeholder="* Enter last name"
          required
        ></input>
        <input
          className="login-form-input"
          name="phoneNumber"
          type="phone"
          placeholder="Enter your phone"
        ></input>
        <input
          className="login-form-input"
          name="address"
          type="text"
          placeholder="Enter address"
        ></input>
        <div className="password-and-validation">
          <input
            className="login-form-password"
            type="password"
            ref={passwordRef}
            placeholder="* Password"
            required
          />
          <input
            className="login-form-validation"
            type="password"
            ref={passwordValidationRef}
            placeholder="*Re enter Password"
            required
          />
        </div>
        <span className="login-form-span">Fields with * are required</span>
        <button className="login-form-button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
