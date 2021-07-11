import React, { useEffect, useState } from "react";
import Register from "./Register";
import Login from "./Login";
import { useDispatch } from "react-redux";
import { setOnLoginPage } from "../actions";

import logo from "../photos/logo-white.png";

export default function PromptLogin() {
  const dispatch = useDispatch();

  // Use states
  const [rightPanelActive, setRightPanelActive] = useState();

  useEffect(() => {
    dispatch(setOnLoginPage(true));
    return () => {
      dispatch(setOnLoginPage(false));
    };
  }, []);

  return (
    <div className="login-page">
      <div className={`login-container`}>
        <div className={`container ${rightPanelActive} `} id="container">
          <Register />
          <Login />
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1 className="login-form-title welcome">Welcome Back!</h1>
                <p className="login-form-paragraph">
                  To keep connected with us please login with your personal info
                </p>
                <button
                  className="login-form-button ghost"
                  id="signIn"
                  onClick={() => {
                    setRightPanelActive();
                  }}
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <img className="login-img" src={logo} alt="logo" />
                <p className="login-form-paragraph" id="under-logo">
                  We invite you to start your journey with us, and with many
                  other drivers
                </p>
                <button
                  className="login-form-button ghost"
                  id="signUp"
                  onClick={() => setRightPanelActive("right-panel-active")}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
