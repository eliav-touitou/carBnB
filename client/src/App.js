import "./App.css";
import { useRef, useState } from "react";
const axios = require("axios");
function App() {
  const [cars, setCars] = useState();
  const owner = useRef();
  const brand = useRef();
  const model = useRef();
  const year = useRef();
  const fuel = useRef();
  const pricePerDay = useRef();
  const pricePerWeek = useRef();
  const pricePerMonth = useRef();

  const getCars = async () => {
    try {
      const { data } = await axios.get("api/v1/cars/allcars");
      setCars(data.data);
    } catch (e) {
      console.log(e.message);
    }
  };
  const uploadCar = async () => {
    const newCar = {
      owner: owner.current.value,
      brand: brand.current.value,
      model: model.current.value,
      year: year.current.value,
      fuel: fuel.current.value,
      pricePerDay: pricePerDay.current.value,
      pricePerWeek: pricePerWeek.current.value,
      pricePerMonth: pricePerMonth.current.value,
    };
    try {
      await axios.post("api/v1/cars/upload", { newCar: newCar });
      console.log("car saved!");
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="App">
      <button onClick={getCars}>Get cars</button>

      {cars?.map((car, i) => (
        <div>
          <h3>{car.brand}</h3>
          <div>{car.model}</div>
          <div>{car.year}</div>
          <hr />
        </div>
      ))}

      <div>
        <input ref={owner} placeholder="Enter Name"></input>
        <input ref={brand} placeholder="Enter Car's Brand"></input>
        <input ref={model} placeholder="Enter Car's model"></input>
        <input ref={year} placeholder="Enter Car's manufacture year"></input>
        <input ref={fuel} placeholder="Enter Car's gas type"></input>
        <input
          ref={pricePerDay}
          placeholder="Enter wanted tariff per day"
        ></input>
        <input
          ref={pricePerWeek}
          placeholder="Enter wanted tariff per week"
        ></input>
        <input
          ref={pricePerMonth}
          placeholder="Enter wanted tariff per Month"
        ></input>
        <div>
          <button onClick={uploadCar}>Upload Car</button>
        </div>
      </div>
    </div>
  );
}

export default App;
