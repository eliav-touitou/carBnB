import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Result from "./Result";
import SideBar from "./SideBar";

export default function Results() {
  // const [, set] = useState(initialState)
  const history = useHistory();
  // Redux states
  const filteredCars = useSelector((state) => state.filteredCars);

  useEffect(() => {
    console.log(history);
  }, []);
  return (
    <div>
      <h1>Results</h1>
      {filteredCars?.map((car, i) => (
        <Result
          key={`car-${i}`}
          resultId={i}
          brand={car.brand}
          passengers={car.passengers}
          carId={car.car_id}
        />
      ))}
      {/* {availableCars.length === 0 ? <Redirect to="/" /> : null} */}
      <SideBar />
    </div>
  );
}
