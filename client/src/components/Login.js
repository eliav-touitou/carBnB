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
    console.log(response);
    console.log("sds");
    try {
      const res = await axios.post("/api/v1/googlelogin", {
        tokenId: response.tokenId,
      });
      console.log("google login success" + res);
    } catch (err) {
      console.log(err.message);
    }
  };
  const responseErrorGoogle = (response) => {};
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
        clientId={process.env.CLIENT_ID}
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
