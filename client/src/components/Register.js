import axios from "axios";
import React, { useEffect } from "react";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowLogin } from "../actions";

export default function Register() {
  const dispatch = useDispatch();
  // UseRefs
  const passwordRef = useRef();
  const passwordValidationRef = useRef();

  // Redux states
  const promptOrNormal = useSelector((state) => state.promptOrNormal);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth) dispatch(setShowLogin(false));
  }, [auth]);

  // Function to save new user to database
  const addNewUser = async (e) => {
    const form = e.target;
    e.preventDefault();
    if (passwordRef.current.value !== passwordValidationRef.current.value) {
      return "fuck you";
    }
    try {
      const formData = new FormData(form);
      const user = {};
      for (let [key, value] of formData.entries()) {
        user[key] = value;
        console.log([key, value]);
      }
      user.password = passwordRef.current.value;
      await axios.post("/api/v1/users/register", { newUser: user });
      console.log("User Saved!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    //   {promptOrNormal === "normal" && auth && <Redirect to="/" />}
    // </div>
    <div className="form-container sign-up-container">
      <form onSubmit={addNewUser}>
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
