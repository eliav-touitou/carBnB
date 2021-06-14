import "./App.css";
import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Home from "./components/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route path="/" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
