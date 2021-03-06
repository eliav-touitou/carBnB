import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { useSelector, useDispatch } from "react-redux";
import { setAuthOut, setSpinner } from "../actions";
import Name from "@material-ui/core/Avatar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import axios from "axios";

export default function Avatar({ setVisibility, setAnchorEl, anchorEl }) {
  const dispatch = useDispatch();

  // Redux states
  const auth = useSelector((state) => state.auth);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    if (auth) {
      setAnchorEl(event.currentTarget);
      setVisibility(false);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutHandler = async () => {
    dispatch(setSpinner(true));
    try {
      await axios.post("/api/v1/users/logout");
      dispatch(setAuthOut());
      dispatch(setSpinner(false));
    } catch (error) {
      console.log("error logout");
      dispatch(setSpinner(false));
    }
  };

  return (
    <div className="Avatar">
      <Button
        aria-controls="fade-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Name>
          {auth ? auth.first_name.slice(0, 1) : <AccountCircleIcon />}
        </Name>
      </Button>
      <Menu
        id="fade-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
        disableScrollLock={true}
      >
        <Link exact={"true"} to="/profile" className="menu-drop-down">
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <Link
          exact={"true"}
          to="/allmyorders/orders"
          className="menu-drop-down"
        >
          <MenuItem onClick={handleClose}>My orders</MenuItem>
        </Link>
        <Link
          exact={"true"}
          to="/allmyorders/rentals"
          className="menu-drop-down"
        >
          <MenuItem onClick={handleClose}>My rentals</MenuItem>
        </Link>
        <Link exact={"true"} to="/favorite" className="menu-drop-down">
          <MenuItem onClick={handleClose}>My favorite</MenuItem>
        </Link>
        <Link
          onClick={logoutHandler}
          exact={"true"}
          to="/"
          className="menu-drop-down"
        >
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
