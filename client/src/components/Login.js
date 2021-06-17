import axios from "axios";
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuth, setAuthOut } from "../actions";
import GoogleLogin from "react-google-login";

export default function Login() {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

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
      const { data: userDetails } = await axios.post("/api/v1/users/login", {
        user: user,
      });
      dispatch(setAuth(userDetails.data));
      console.log("Success Login");
    } catch (error) {
      dispatch(setAuthOut());
      console.log(error.message);
    }
  };

  const responseSuccessGoogle = async (response) => {
    try {
      const { data: userDetails } = await axios.post("/api/v1/googlelogin", {
        tokenId: response.tokenId,
      });
      dispatch(setAuth(userDetails.data));
      console.log("google login success");
    } catch (err) {
      dispatch(setAuthOut());
      console.log(err.message);
    }
  };

  const responseErrorGoogle = (response) => {
    dispatch(setAuthOut());
    console.error("ERROR LOGIN WITH GOOGLE");
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
      <GoogleLogin
        clientId="186150944842-sg6rcdti8hqtq2td43gv4jo2t1jmc8hj.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseSuccessGoogle}
        onFailure={responseErrorGoogle}
        cookiePolicy={"single_host_origin"}
      />
      <Link to="/register">
        <button>go to register</button>
      </Link>
    </div>
  );
}
