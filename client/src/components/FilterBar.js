import axios from "axios";
import React, { useRef, useState } from "react";

export default function SearchBar() {
  const [searchByBrand, setSearchByBrand] = useState();
  const [searchByPassengers, setSearchByPassengers] = useState();
  const brandRef = useRef();
  const passengersRef = useRef();

  const searchParameters = {
    data: ["", [], []],
  };

  const search = async () => {
    const brand = brandRef.current.value;
    const passengers = passengersRef.current.value;
    try {
      const res = await axios.post("api/v1/getitem", searchParameters);
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      do you know what car do you want?:
      <button onClick={() => setSearchByBrand(true)}>Add car Brand!</button>
      {searchByBrand && (
        <div>
          <input list="model" name="model" ref={brandRef}></input>
          <datalist id="model">
            <option value="Reno" />
            <option value="Suzuki" />
            <option value="Toyota" />
            <option value="Ford" />
            <option value="Skoda" />
          </datalist>
        </div>
      )}
      {searchByPassengers && (
        <div>
          do you what size of car you need?
          <button onClick={() => setSearchByPassengers(true)}>
            Add car Brand!
          </button>
          <input list="passengers" ref={passengersRef}></input>
          <datalist id="passengers">
            <option value="Reno" />
            <option value="Suzuki" />
            <option value="Toyota" />
            <option value="Ford" />
            <option value="Skoda" />
          </datalist>
        </div>
      )}
      <button onClick={search}></button>
    </div>
  );
}
