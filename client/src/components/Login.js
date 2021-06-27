import axios from "axios";
import React, { useEffect, useRef } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuth, setAuthOut, setOnLoginPage, setShowLogin } from "../actions";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import logo from "../carBnB-logo.png";

import FacebookOutlinedIcon from "@material-ui/icons/FacebookOutlined";
import GoogleIcon from "@material-ui/icons/Google";
export default function Login() {
  const dispatch = useDispatch();

  // Redux states
  const auth = useSelector((state) => state.auth);

  // UseRefs
  const userNameRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    dispatch(setOnLoginPage(true));
    return () => {
      dispatch(setOnLoginPage(false));
    };
  }, []);

  useEffect(() => {
    if (auth) dispatch(setShowLogin(false));
  }, [auth]);

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

  // Response if login with google success
  const responseSuccessGoogle = async (response) => {
    try {
      const { data: userDetails } = await axios.post(
        "/api/v1/auth/googleLogin",
        {
          tokenId: response.tokenId,
        }
      );
      dispatch(setAuth(userDetails.data));
      console.log("google login success");
    } catch (err) {
      dispatch(setAuthOut());
      console.log(err.message);
    }
  };

  // Response if login with facebook success
  const responseFacebook = async (response) => {
    console.log(response);
    try {
      const { data: userDetails } = await axios.post(
        "/api/v1/auth/facebookLogin",
        {
          accessToken: response.accessToken,
          userId: response.userID,
        }
      );
      dispatch(setAuth(userDetails.data));
      console.log("facebook login success");
    } catch (err) {
      dispatch(setAuthOut());
      console.log(err.message);
    }
  };

  // Response if login with google failed
  const responseErrorGoogle = (response) => {
    dispatch(setAuthOut());
    console.error("ERROR LOGIN WITH GOOGLE");
  };

  return (
    <div className="form-container sign-in-container">
      <form action="#">
        <h1 className="login-form-title">Sign in</h1>
        <div className="social-container">
          {/* <a href="#" className="login-form-a social"></a>
          <a href="#" className="login-form-a social"></a> */}

          <GoogleLogin
            clientId="186150944842-sg6rcdti8hqtq2td43gv4jo2t1jmc8hj.apps.googleusercontent.com"
            render={(renderProps) => (
              <div
                className="login-form-a social"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <i className="fab fa-google-plus-g" />
              </div>
            )}
            buttonText="Login"
            onSuccess={responseSuccessGoogle}
            onFailure={responseErrorGoogle}
            cookiePolicy={"single_host_origin"}
          />
          <FacebookLogin
            appId="830912607629776"
            cssClass="social facebook-button"
            icon="fa fa-facebook"
            textButton={""}
            autoLoad={false}
            fields={"adress"}
            callback={responseFacebook}
          />
        </div>
        <span className="login-form-span">or use your account</span>
        <input
          className="login-form-input"
          type="email"
          placeholder="Email"
          ref={userNameRef}
        />
        <input
          className="login-form-input"
          type="password"
          placeholder="Password"
          ref={passwordRef}
        />
        {/* <a href="#">Forgot your password?</a> */}
        <button className="login-form-button" onClick={onLoginHandler}>
          Sign In
        </button>
      </form>
    </div>

    // <div className={`login-container-${promptOrNormal}`}>
    //   <input
    //     className={`username-input-login-${promptOrNormal}`}
    //     ref={userNameRef}
    //     type="text"
    //     placeholder="enter your username"
    //   ></input>
    //   <input
    //     className={`password-input-login-${promptOrNormal}`}
    //     ref={passwordRef}
    //     type="password"
    //     placeholder="enter your password"
    //   ></input>
    //   <button onClick={onLoginHandler}>login</button>
    // <GoogleLogin
    //   clientId="186150944842-sg6rcdti8hqtq2td43gv4jo2t1jmc8hj.apps.googleusercontent.com"
    //   buttonText="Login"
    //   onSuccess={responseSuccessGoogle}
    //   onFailure={responseErrorGoogle}
    //   cookiePolicy={"single_host_origin"}
    // />
    // <FacebookLogin
    //   appId="830912607629776"
    //   autoLoad={false}
    //   callback={responseFacebook}
    // />

    //   <Link to="/register">
    //     <button className={`register-btn-login-${promptOrNormal}`}>
    //       go to register
    //     </button>
    //   </Link>
    // </div><div>
  );
}
