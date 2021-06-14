import axios from "axios";
import React from "react";
import { useRef } from "react";

export default function Register() {
  const passwordRef = useRef();
  const passwordValidationRef = useRef();

  // Function to save new user to database
  const addNewUser = async (e) => {
    const form = e.target;
    e.preventDefault();
    if (passwordRef !== passwordValidationRef) {
      return "fuck you";
    }
    try {
      const formData = new FormData(form);
      const user = {};
      for (let [key, value] of formData.entries()) {
        user[key] = value;
      }
      console.log(user);
      await axios.post("/api/v1/users/register", { newUser: user });
      console.log("User Saved!");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <form onSubmit={addNewUser}>
        <div>
          <label>
            email
            <input
              name="email"
              type="email"
              placeholder="enter your email"
              required
            ></input>
          </label>
        </div>
        <div>
          <label>
            phone:
            <input
              name="phone"
              type="phone"
              placeholder="enter your phone"
              required
            ></input>
          </label>
        </div>
        <div>
          <label>
            first name
            <input
              name="firstName"
              type="text"
              placeholder="enter your first name"
              required
            ></input>
          </label>
        </div>
        <div>
          <label>
            last name
            <input
              name="lastName"
              type="text"
              placeholder="enter your last name"
              required
            ></input>
          </label>
        </div>
        <div>
          <label>
            address
            <input
              name="address"
              type="text"
              placeholder="enter your address"
              required
            ></input>
          </label>
        </div>
        <div>
          <label>
            password
            <input
              ref={passwordRef}
              name="password"
              type="password"
              placeholder="enter your password"
              required
            ></input>
          </label>
        </div>
        <div>
          <label>
            validate password
            <input
              ref={passwordValidationRef}
              type="password"
              placeholder="enter your password again"
              required
            ></input>
          </label>
        </div>
        <button type="submit">register</button>
      </form>
    </div>
  );
}
