import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { useSelector, useDispatch } from "react-redux";
import { setFilterYears } from "../actions";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}s`;
}

export default function RangeSlider() {
  const dispatch = useDispatch();
  const yearsFilter = useSelector((state) => state.yearsFilter);

  const classes = useStyles();
  const handleChange = (event, newValue) => {
    dispatch(setFilterYears(newValue));
  };

  return (
    <div className={classes.root}>
      <Slider
        min={1980}
        max={2021}
        value={yearsFilter}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
