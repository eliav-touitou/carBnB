import axios from "axios";
import React, { useRef } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const userNameRef = useRef();
  const passwordRef = useRef();

  const onLoginHandler = async () => {
    if (userNameRef === "" || passwordRef === "") {
      return;
    }
    const user = {
      name: userNameRef,
      password: passwordRef,
    };

    try {
      await axios.post("/api/v1/users/login", user);
    } catch (error) {
      console.log(error);
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
