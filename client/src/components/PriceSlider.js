import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import { useSelector, useDispatch } from "react-redux";
import { setFilterPrice } from "../actions";

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

function valuetext(value) {
  return `${value}s`;
}

export default function RangeSlider() {
  const [maxPrice, setMaxPrice] = useState(100);
  const dispatch = useDispatch();
  const priceFilter = useSelector((state) => state.priceFilter);

  const classes = useStyles();
  const handleChange = (event, newValue) => {
    dispatch(setFilterPrice(newValue));
  };

  return (
    <div className={classes.root}>
      <Slider
        max={maxPrice}
        value={priceFilter}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
