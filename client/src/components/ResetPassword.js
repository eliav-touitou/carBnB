import { Snackbar } from "@material-ui/core";
import axios from "axios";
import React, { useRef, useState } from "react";
import { Redirect, useParams } from "react-router-dom";
import { setShowLogin } from "../actions";

export default function ResetPassword() {
  const { id } = useParams();
  const newPasswordRef = useRef();
  const confirmNewPasswordRef = useRef();
  const resetCodeRef = useRef();

  // Use State
  const [sneck, setSneck] = useState(false);
  const [redirect, setRedirect] = useState();

  const resetPasswordHandler = async () => {
    try {
      if (
        !newPasswordRef.current.value ||
        !confirmNewPasswordRef.current.value ||
        !resetCodeRef.current.value
      )
        return alert("must fill all fields");
      if (newPasswordRef.current.value !== confirmNewPasswordRef.current.value)
        return alert("Password does not match");

      await axios.put(`/api/v1/auth/resetpassword/${id}`, {
        resetCode: resetCodeRef.current.value,
        newPassword: newPasswordRef.current.value,
      });
      setSneck(
        "Your password reset was successful you will redirect to login page"
      );
      setTimeout(() => {
        setSneck(false);
        setRedirect(true);
        setShowLogin(true);
      }, 2500);
    } catch (err) {
      setSneck(err.response.data.message);
      setTimeout(() => {
        setSneck(false);
      }, 3500);
    }
  };
  return (
    <div className="page-reset-password">
      <div className="container-reset-password">
        <div className="row">
          <div className="col-sm-4">
            <label>New Password</label>
            <div className="form-group pass_show">
              <input
                ref={newPasswordRef}
                type="password"
                className="form-control"
                placeholder="New Password"
              />
              <button
                onClick={() => {
                  newPasswordRef.current.type === "text"
                    ? (newPasswordRef.current.type = "password")
                    : (newPasswordRef.current.type = "text");
                }}
              >
                <i className="far fa-eye"></i>
              </button>
            </div>
            <label>Confirm Password</label>
            <div className="form-group pass_show">
              <input
                ref={confirmNewPasswordRef}
                type="password"
                className="form-control"
                placeholder="Confirm Password"
              />
              <button
                onClick={() => {
                  confirmNewPasswordRef.current.type === "text"
                    ? (confirmNewPasswordRef.current.type = "password")
                    : (confirmNewPasswordRef.current.type = "text");
                }}
              >
                <i className="far fa-eye"></i>
              </button>
            </div>
            <label>Confirm Reset Code from email</label>
            <div className="form-group">
              <input
                ref={confirmNewPasswordRef}
                type="text"
                className="form-control"
                placeholder="Reset Code"
                ref={resetCodeRef}
              />
            </div>
            <button onClick={resetPasswordHandler}>Reset Password</button>
          </div>
        </div>
      </div>
      {sneck && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={true}
          message={sneck}
          key={"top" + "center"}
        />
      )}
      {redirect && <Redirect push={true} to="/" />}
    </div>
  );
}
