import axios from "axios";
import React, { useRef } from "react";

export default function SearchBar() {
  const brandRef = useRef();
  const search = async () => {
    const brand = brandRef.current.value;
    const searchParameters = {
      data: ["Car", ["brand"], [`${brand}`]],
    };
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
      <input list="cars" ref={brandRef}></input>
      <datalist id="cars">
        <option value="Reno" />
        <option value="Suzuki" />
        <option value="Toyota" />
        <option value="Ford" />
        <option value="Skoda" />
      </datalist>
      <button onClick={search}>search!</button>
      do you what size of car you need?
      <input list="passengers" ref={brandRef}></input>
      <datalist id="passengers">
        <option value="Reno" />
        <option value="Suzuki" />
        <option value="Toyota" />
        <option value="Ford" />
        <option value="Skoda" />
      </datalist>
      <button onClick={search}>search!</button>
    </div>
  );
}
