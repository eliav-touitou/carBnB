import React, { useEffect, useState } from "react";
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
  const dispatch = useDispatch();
  const classes = useStyles();

  // Redux states
  const priceFilter = useSelector((state) => state.priceFilter);
  const availableCars = useSelector((state) => state.availableCars);

  // Use states
  const [maxPrice, setMaxPrice] = useState(100);

  useEffect(() => {
    const temp = [];
    availableCars?.forEach((car) => {
      temp.push(car.price_per_day);
    });
    if (temp.length > 0) {
      const maxPriceFromDB = Math.max(...temp);
      setMaxPrice(maxPriceFromDB);
    } else {
      setMaxPrice(100);
    }
  }, []);

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
