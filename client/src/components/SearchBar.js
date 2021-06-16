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
      await axios.post("api/v1/getitem", searchParameters);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      do you know what car do you want?:
      <input list="cars" ref={brandRef}></input>
      <datalist id="cars">
        <option value="BMW" />
        <option value="Bentley" />
        <option value="Mercedes" />
        <option value="Audi" />
        <option value="Volkswagen" />
      </datalist>
      <button onClick={search}>search!</button>
    </div>
  );
}
