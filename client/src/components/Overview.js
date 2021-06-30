import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OverviewDetail from "./OverviewDetail";

export default function Overview({ iconsKey }) {
  const auth = useSelector((state) => state.auth);

  const [userDetails, setUserDetails] = useState([]);
  useEffect(() => {
    const temp = Object.entries(auth);
    temp.map(([key, value]) => {
      if (
        key !== "updatedAt" &&
        key !== "createdAt" &&
        key !== "license" &&
        key !== "number_of_votes" &&
        key !== "rating" &&
        key !== "last_name"
      ) {
        if (key === "first_name") {
          value = value + " " + auth.last_name;
        }
        setUserDetails((prev) => [...prev, [key, value]]);
      }
    });

    return () => {
      setUserDetails([]);
    };
  }, [auth]);
  return (
    <div>
      <ul>
        {userDetails &&
          userDetails?.map(([key, value], i) => (
            <OverviewDetail
              key={`key-${i}`}
              keys={key}
              value={value}
              iconsKey={iconsKey}
            />
          ))}
      </ul>
    </div>
  );
}
