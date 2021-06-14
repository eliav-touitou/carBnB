import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
const axios = require("axios");
function App() {
  const [cars, setCars] = useState();

  const getCars = () => {
    try {
      axios.get("/cars", async (req, res) => {
        const cars = await res.body;
        setCars(cars);
      });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <div className="App">
      <button onClick={getCars}>Get cars</button>
      {/* <cars && cars */}
    </div>
  );
}

export default App;
