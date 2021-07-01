import React, { useEffect, useState } from "react";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import MyCar from "./MyCar";

export default function MyCars({
  myCarData,
  iconsKey,
  setIndexPage,
  indexPage,
  nextPage,
  setMyCarsData,
  myCarsData,
}) {
  const [carDetails, setCarDetails] = useState([]);

  useEffect(() => {
    return () => {
      setIndexPage(0);
    };
  }, []);

  useEffect(() => {
    if (myCarData) {
      const temp = Object.entries(myCarData);
      temp.map(([key, value]) => {
        if (
          key !== "car_id" &&
          key !== "owner_email" &&
          key !== "updatedAt" &&
          key !== "createdAt" &&
          key !== "is_rented"
        ) {
          if (key === "available_from" || key === "available_until") {
            value = new Date(value).toDateString();
          }
          setCarDetails((prev) => [...prev, [key, value]]);
        }
      });
    }
    return () => {
      setCarDetails([]);
    };
  }, [indexPage, myCarsData]);

  return (
    <div>
      <span onClick={nextPage}>⏭</span>
      <ul>
        {carDetails.map(([key, value], i) => (
          <MyCar
            key={`key-${i}`}
            keys={key}
            value={value}
            iconsKey={iconsKey}
            carId={myCarData?.car_id}
            setMyCarsData={setMyCarsData}
            myCarsData={myCarsData}
          />
        ))}
      </ul>
    </div>
  );
}
