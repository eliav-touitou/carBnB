import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { setAvailableCars, setFilterRate } from "../actions";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: 0,
    label: "0+",
  },
  {
    value: 1,
    label: "1+",
  },
  {
    value: 2,
    label: "2+",
  },
  {
    value: 3,
    label: "3+",
  },
  {
    value: 4,
    label: "4+",
  },
  {
    value: 5,
    label: "5",
  },
];

export default function RatingSlider() {
  const dispatch = useDispatch();
  const ratingFilter = useSelector((state) => state.ratingFilter);
  const classes = useStyles();

  const filterCarByOwnerRate = async (event, newValue) => {
    dispatch(setFilterRate(newValue));
    const { data } = await axios.post("api/v1/users/rated", {
      minRate: newValue,
    });
    const ratedUser = data.data;
    console.log(ratedUser);
  };

  return (
    <div className={classes.root}>
      <Slider
        max={5}
        defaultValue={0}
        onChange={filterCarByOwnerRate}
        aria-labelledby="discrete-slider-always"
        step={1}
        marks={marks}
        valueLabelDisplay="on"
      />
    </div>
  );
}
