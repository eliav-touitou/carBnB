import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Avatar as ProfileAvatar, ClickAwayListener } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { setAuthOut } from "../actions";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  dropdown: {
    position: "absolute",
    top: 28,
    right: 0,
    left: 0,
    zIndex: 1,
    border: "1px solid",
    padding: theme.spacing(1),
    width: "min-content",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Avatar() {
  const dispatch = useDispatch();
  const classes = useStyles();

  // Redux states
  const auth = useSelector((state) => state.auth);

  // Use states
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
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
    <div>
      <ClickAwayListener onClickAway={handleClickAway}>
        <div className={classes.root}>
          <button type="button" onClick={handleClick}>
            <ProfileAvatar>{auth.first_name?.slice(0, 1)}</ProfileAvatar>
          </button>
          {open ? (
            <div>
              <Link to="/Profile">
                <div className={classes.dropdown}>Profile</div>
              </Link>
              <div className={classes.dropdown} onClick={logoutHandler}>
                Logout
              </div>
            </div>
          ) : null}
        </div>
      </ClickAwayListener>
    </div>
  );
}
