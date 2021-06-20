import React, { useEffect, useState } from "react";
import Register from "./components/Register";
import Login from "./components/Login";
import { useDispatch } from "react-redux";
import { setPromptOrNormal } from "../actions";

export default function PromptLogin() {
  const [register, setRegister] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setPromptOrNormal("prompt"));
    return () => {
      dispatch(setPromptOrNormal("normal"));
    };
  }, []);

  return (
    <div>
      {register ? <Register /> : <Login />}
      or:
      {register ? (
        <button onClick={() => setRegister(false)}> Back To Login</button>
      ) : (
        <button onClick={() => setRegister(true)}> Create A new User</button>
      )}
    </div>
  );
}
