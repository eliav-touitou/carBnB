import React, { useEffect, useState } from "react";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";

export default function MyCars({
  myCarsData,
  iconsKey,
  setIndexPage,
  indexPage,
}) {
  const [carDetails, setCarDetails] = useState([]);

  useEffect(() => {
    return () => {
      setIndexPage(0);
    };
  }, []);

  useEffect(() => {
    if (myCarsData) {
      const temp = Object.entries(myCarsData[indexPage]);
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
  }, [indexPage]);

  const nextPage = () => {
    if (indexPage === myCarsData.length - 1) {
      setIndexPage(0);
    } else {
      setIndexPage((prev) => (prev += 1));
    }
  };

  return (
    <div>
      <span onClick={nextPage}>⏭</span>
      <ul>
        {carDetails.map(([key, value], i) => (
          <>
            <li>
              {iconsKey[key]} {value}
              <span className="pencil-profile">
                <CreateOutlinedIcon />
              </span>
            </li>
          </>
        ))}
      </ul>
    </div>
  );
}
