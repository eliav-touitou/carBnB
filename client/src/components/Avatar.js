import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Fade from "@material-ui/core/Fade";
import { useSelector, useDispatch } from "react-redux";
import { setAuthOut } from "../actions";
import Name from "@material-ui/core/Avatar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import axios from "axios";

export default function Avatar() {
  const dispatch = useDispatch();

  // Redux states
  const auth = useSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    if (auth) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const logoutHandler = async () => {
    try {
      console.log(await axios.post("/api/v1/users/logout"));
      dispatch(setAuthOut());
    } catch (error) {
      console.log("error logout");
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
      >
        <Link>
          <MenuItem onClick={handleClose}>Profile</MenuItem>
        </Link>
        <Link>
          <MenuItem onClick={handleClose}>My account</MenuItem>
        </Link>
        <Link onClick={logoutHandler} to="/">
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
