import axios from "axios";
import React, { useRef } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const userNameRef = useRef();
  const passwordRef = useRef();

  // Send login data, user name and password
  const onLoginHandler = async () => {
    if (userNameRef.current.value === "" || passwordRef.current.value === "") {
      return;
    }
    const user = {
      email: userNameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post("/api/v1/users/login", { user: user });
      console.log("Success Login");
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div>
      <input
        ref={userNameRef}
        type="text"
        placeholder="enter your username"
      ></input>
      <input
        ref={passwordRef}
        type="password"
        placeholder="enter your password"
      ></input>
      <button onClick={onLoginHandler}>login</button>
      <Link to="/register">
        <button>go to register</button>
      </Link>
    </div>
  );
}
