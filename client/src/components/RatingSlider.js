// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import Typography from "@material-ui/core/Typography";
// import Slider from "@material-ui/core/Slider";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: 300,
//   },
//   margin: {
//     height: theme.spacing(3),
//   },
// }));

// const marks = [
//   {
//     value: 0,
//     label: "0°C",
//   },
//   {
//     value: 1,
//     label: "1",
//   },
//   {
//     value: 2,
//     label: "2",
//   },
//   {
//     value: 3,
//     label: "3",
//   },
//   {
//     value: 4,
//     label: "4",
//   },
//   {
//     value: 5,
//     label: "5",
//   },
// ];

// function valuetext(value) {
//   return `${value}`;
// }

// export default function DiscreteSlider() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <Typography id="discrete-slider-always" gutterBottom>
//         Rating:
//       </Typography>
//       <Slider
//         defaultValue={80}
//         getAriaValueText={valuetext}
//         aria-labelledby="discrete-slider-always"
//         step={10}
//         marks={marks}
//         valueLabelDisplay="on"
//       />
//     </div>
//   );
// }
