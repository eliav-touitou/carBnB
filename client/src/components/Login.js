import axios from "axios";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLogged } from "../actions";

export default function Login() {
  const userNameRef = useRef();
  const passwordRef = useRef();

  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();

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
      dispatch(setLogged(true));
      console.log("Success Login");
    } catch (error) {
      dispatch(setLogged(false));
      console.log(error.message);
    }
  };
  return (
    <div>
      <p>isLogged {String(isLogged)}</p>

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
