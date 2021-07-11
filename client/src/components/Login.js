import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuth, setAuthOut, setOnLoginPage, setShowLogin } from "../actions";
import GoogleLogin from "react-google-login";
import FacebookLogin from "react-facebook-login";
import logo from "../photos/carBnB-logo.png";
import { Snackbar } from "@material-ui/core";
import FacebookOutlinedIcon from "@material-ui/icons/FacebookOutlined";
import GoogleIcon from "@material-ui/icons/Google";

export default function Login() {
  const dispatch = useDispatch();

  const [forgotPassword, setForgotPassword] = useState(false);
  const [snack, setSnack] = useState();

  // Redux states
  const auth = useSelector((state) => state.auth);

  // UseRefs
  const userNameRef = useRef();
  const passwordRef = useRef();
  const forgotEmailRef = useRef();

  useEffect(() => {
    dispatch(setOnLoginPage(true));
    return () => {
      dispatch(setOnLoginPage(false));
    };
  }, []);

  useEffect(() => {
    if (auth) dispatch(setShowLogin(false));
    return () => {
      dispatch(setShowLogin(false));
    };
  }, [auth]);

  // Send login data, user name and password
  const onLoginHandler = async (e) => {
    e.preventDefault();
    if (userNameRef.current.value === "" || passwordRef.current.value === "") {
      return;
    }
    const user = {
      email: userNameRef.current.value,
      password: passwordRef.current.value,
    };
    console.log(user);

    try {
      const { data: userDetails } = await axios.post("/api/v1/users/login", {
        user: user,
      });
      console.log("mose mose");
      console.log(userDetails);
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

  const onForgotHandler = async (e) => {
    e.preventDefault();
    if (!forgotEmailRef.current.value) return alert("Must enter email first");
    try {
      await axios.put("/api/v1/auth/forgotpassword", {
        userEmail: forgotEmailRef.current.value,
      });
      setSnack(true);
      setTimeout(() => {
        setSnack(false);
      }, 4000);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="form-container sign-in-container">
      <div
        className="x login"
        onClick={() => {
          dispatch(setShowLogin(false));
        }}
      >
        ✖
      </div>
      <form action="#">
        {!forgotPassword ? (
          <>
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
            <a
              href="#"
              onClick={() => setForgotPassword(true)}
              className="forgot-password-btn "
            >
              Forgot your password?
            </a>
            <button className="login-form-button" onClick={onLoginHandler}>
              Sign In
            </button>
          </>
        ) : (
          <>
            <input
              ref={forgotEmailRef}
              className="login-form-input"
              placeholder="Enter Your email"
            />
            <button onClick={onForgotHandler} className="login-form-button">
              Reset Password
            </button>
            {snack && (
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={true}
                message={"Check your mail box, reset link successfully send"}
                key={"top" + "center"}
              />
            )}
          </>
        )}
      </form>{" "}
    </div>
  );
}
