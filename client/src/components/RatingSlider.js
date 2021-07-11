import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { setFilterRate } from "../actions";
import { useSelector, useDispatch } from "react-redux";

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
  const classes = useStyles();

  // Redux states
  const ratingFilter = useSelector((state) => state.ratingFilter);

  // Use states
  const [tempRating, setTempRating] = useState();

  const filterCarByOwnerRate = async (event, newValue) => {
    if (newValue !== ratingFilter) {
      setTempRating(newValue);
    }
  };

  return (
    <div className={classes.root} id="rating-slider">
      <Slider
        max={5}
        defaultValue={0}
        onChange={filterCarByOwnerRate}
        onChangeCommitted={() => dispatch(setFilterRate(tempRating))}
        aria-labelledby="discrete-slider-always"
        step={1}
        marks={marks}
        valueLabelDisplay="auto"
      />
    </div>
  );
}
