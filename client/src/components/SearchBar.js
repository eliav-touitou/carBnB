import axios from "axios";
import React, { useRef, useState } from "react";

export default function SearchBar() {
  const cityRef = useRef();
  const passengersRef = useRef();
  const endDateRef = useRef();
  const startDateRef = useRef();
  let day = new Date();
  let today = day.toISOString().slice(0, 10);
  let tomorrow = day;
  tomorrow.setDate(day.getDate() + 1);
  tomorrow = tomorrow.toISOString().slice(0, 10);

  //////////
  // const [tomorrow, setTomorrow] = useState();
  // let daysOnly = parseInt(startDateRef.slice(-2));
  // let newDate = (daysOnly += 1);

  // startDateRef.substring(0, startDateRef.length - 2) + `${newDate}`;
  // ////////
  // useEffect(() => {
  //   return () => {
  //     cleanup;
  //   };
  // }, []);

  const search = async () => {
    const city = cityRef.current.value;
    const passengers = Number(passengersRef.current.value.slice(0, -1));
    const startDate = startDateRef.current.value;
    const endDate = endDateRef.current.value;
    const searchParameters = {
      data: { city, startDate, endDate, passengers },
    };
    try {
      const res = await axios.post("api/v1/search/initial", searchParameters);
      console.log(res.data.data);
    } catch (err) {
      console.log(err.response.data.message);
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
            // value={today}
            min={today}
            max="2022-01-01"
          ></input>
        </div>
        <div className="end-date">
          <label for="start">End date:</label>
          <input
            ref={endDateRef}
            type="date"
            name="rent-end"
            // value={tomorrow}
            min={tomorrow}
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
