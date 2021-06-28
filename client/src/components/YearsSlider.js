import React, { useEffect, useState } from "react";
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
  const classes = useStyles();

  // Redux states
  const yearsFilter = useSelector((state) => state.yearsFilter);
  const availableCars = useSelector((state) => state.availableCars);

  // Use states
  const [maxYear, setMaxYear] = useState(100);
  const [minYear, setMinYear] = useState(100);

  const handleChange = (event, newValue) => {
    dispatch(setFilterYears(newValue));
  };

  useEffect(() => {
    const temp = [];
    availableCars?.forEach((car) => {
      temp.push(car.year);
    });
    if (temp.length > 0) {
      const maxYearFromDB = Math.max(...temp);
      const minYearFromDB = Math.min(...temp);
      setMaxYear(maxYearFromDB);
      setMinYear(minYearFromDB);
      dispatch(setFilterYears([minYearFromDB - 5, maxYearFromDB + 5]));
    }
  }, []);

  return (
    <div className={classes.root} id="years-slider">
      <Slider
        min={minYear - 10}
        max={maxYear + 10}
        value={yearsFilter}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        getAriaValueText={valuetext}
      />
    </div>
  );
}
