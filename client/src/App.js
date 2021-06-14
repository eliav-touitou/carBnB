import "./App.css";
import { useState } from "react";
const axios = require("axios");
function App() {
  const [cars, setCars] = useState();

  const getCars = async () => {
    try {
      const { data } = await axios.get("api/v1/cars/allcars");
      setCars(data);
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="App">
      <button onClick={getCars}>Get cars</button>

      {cars &&
        cars?.map((car, i) => (
          <div>
            <h3>{car.brand}</h3>
            <div>{car.model}</div>
            <div>{car.year}</div>
            <hr />
          </div>
        ))}
    </div>
  );
}

export default App;
