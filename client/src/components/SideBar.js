import React, { useRef, useState } from "react";
// import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import FilterBar from "./FilterBar";
import Drawer from "@material-ui/core/Drawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import { setFilteredCars } from "../actions";
import FilterCheck from "./FilterCheck";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import MailIcon from "@material-ui/icons/Mail";

// const useStyles = makeStyles({
//   list: {
//     width: 250,
//   },
//   fullList: {
//     width: "auto",
//   },
// });

export default function TemporaryDrawer() {
  // const classes = useStyles();
  const dispatch = useDispatch();

  // Redux states
  const yearsFilter = useSelector((state) => state.yearsFilter);
  const priceFilter = useSelector((state) => state.priceFilter);
  const availableCars = useSelector((state) => state.availableCars);
  const ratingFilter = useSelector((state) => state.ratingFilter);

  // Use states
  const [filterObj, setFilterObj] = useState({});
  const [state, setState] = useState({ left: false });

  // UseRefs for filter inputs
  const brandRef = useRef();
  const modelRef = useRef();
  const gearRef = useRef();
  const fuelRef = useRef();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    // Check if the side bar were closed => if yes =>
    // Saved all the data from the filter and show only the filtered results
    setState({ left: open });
  };

  const list = (anchor) => (
    <div
      //   className={clsx(classes.list, {
      //     [classes.fullList]: anchor === "top" || anchor === "bottom",
      //   })}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem>
          {/* <FilterBar
            brandRef={brandRef}
            modelRef={modelRef}
            gearRef={gearRef}
            fuelRef={fuelRef}
          /> */}
          <FilterCheck />
        </ListItem>
      </List>
      <Divider />
      <Button onClick={toggleDrawer(anchor, false)}>Close and save</Button>
    </div>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>Filter Bar</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
