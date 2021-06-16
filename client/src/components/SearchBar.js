import axios from "axios";
import React, { useRef } from "react";

export default function SearchBar() {
  const cityRef = useRef();
  const passengersRef = useRef();
  const endDateRef = useRef();
  const startDateRef = useRef();
  const search = async () => {
    const city = cityRef.current.value;
    const passengers = passengersRef.current.value;
    const startDate = startDateRef.current.value;
    const endDate = endDateRef.current.value;
    const searchParameters = {
      data: [city, startDate, endDate, passengers],
    };
    try {
      const res = await axios.post("api/v1/search/initial", searchParameters);
      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div>
      <div className="choose-city">
        Where do you want a car?:
        <input list="Cities" ref={cityRef}></input>
        <datalist id="Cities">
          <option value="Modiin" />
          <option value="Efrat" />
          <option value="Pisgat_zeev" />
          <option value="cfar haroee" />
          <option value="Yokneam" />
        </datalist>
      </div>
      <div className="choose-dates">
        <div className="start-date">
          <label for="start">Start date:</label>
          <input
            ref={startDateRef}
            type="date"
            name="rent-start"
            // value={new Date()}
            min="2018-01-01"
            max="2022-01-01"
          ></input>
        </div>
        <div className="end-date">
          <label for="start">End date:</label>
          <input
            ref={endDateRef}
            type="date"
            name="rent-end"
            // value="2018-07-22"
            min="2018-01-01"
            max="2022-02-01"
          ></input>
        </div>
      </div>
      <div>
        what size of car you need?
        <input list="passengers" ref={passengersRef}></input>
        <datalist id="passengers">
          <option value="2+" />
          <option value="4+" />
          <option value="5+" />
          <option value="7+" />
          <option value="else..." />
        </datalist>
      </div>
      <button onClick={search}>search!</button>
    </div>
  );
}
