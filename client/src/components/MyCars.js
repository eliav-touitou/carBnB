import React, { useEffect, useState } from "react";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";

export default function MyCars({ myCar, iconsKey }) {
  console.log(myCar);
  console.log(iconsKey);
  const [arr, setArr] = useState([]);

  useEffect(() => {
    if (myCar) {
      const temp = Object.entries(myCar);
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
          //   if (key === "available_from")
          setArr((prev) => [...prev, [key, value]]);
        }
      });
    }
  }, []);

  return (
    <div>
      <ul>
        {arr.map(([key, value]) => (
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
