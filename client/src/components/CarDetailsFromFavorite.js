import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useLocation } from "react-router-dom";
import {
  setPhotosArray,
  setShowLogin,
  setCarToRental,
  setSpinner,
} from "../actions";
import { Icon } from "@iconify/react";
import seatPassenger from "@iconify-icons/mdi/seat-passenger";
import { Snackbar } from "@material-ui/core";
import Cards from "react-credit-cards";
import { setRentalDetails, setAuthLicense } from "../actions";
import "react-credit-cards/lib/styles-compiled.css";

export default function CarDetails() {
  const dispatch = useDispatch();
  const { car, dates } = useLocation().state;

  // Use states
  const [redirect, setRedirect] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const [isTakenMessage, setIsTakenMessage] = useState(false);
  const [image, setImage] = useState([]);
  const [data, setData] = useState({
    cvc: "",
    expiry: "",
    name: "",
    number: "",
  });

  // Redux States
  const photosArray = useSelector((state) => state.photosArray);
  const auth = useSelector((state) => state.auth);

  //bringing the photos of the corresponding car, and emptying it on component down
  useEffect(() => {
    dispatch(setSpinner(true));

    const photosData = ["Photo", ["car_id"], [car.car_id]];
    axios
      .post("/api/v1/search/getitem", { data: photosData })
      .then(({ data }) => {
        dispatch(setPhotosArray(data.data));
        dispatch(setSpinner(false));
      })
      .catch((err) => {
        console.log(err.message);
        dispatch(setSpinner(false));
      });
    return () => {
      dispatch(setPhotosArray([]));
    };
  }, []);

  useEffect(() => {
    if (auth) dispatch(setShowLogin(false));
  }, [auth]);

  useEffect(() => {
    if (showMessage) {
      setTimeout(() => {
        setShowMessage(false);
      }, 4500);
    }
  }, [showMessage]);

  // Handle credit Card Details
  const handleInputChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  // Function for get numbers of days rental
  const getNumberOfRentalDays = () => {
    const numberOfDaysToRent = Math.round(
      (new Date(dates.endDate) - new Date(dates.startDate)) /
        (1000 * 60 * 60 * 24)
    );
    return numberOfDaysToRent;
  };

  // Function for calculate price for rental
  const calculateDiscount = () => {
    const pricePerDay = car.price_per_day;
    const discountAboveWeek = car.discount_for_week;
    const discountAboveMonth = car.discount_for_month;
    const numberOfDaysToRent = getNumberOfRentalDays();
    let newPrice = 0;

    if (numberOfDaysToRent < 7) {
      newPrice = pricePerDay * numberOfDaysToRent;
      return { price: newPrice };
    }

    if (numberOfDaysToRent >= 30) {
      const percent = discountAboveMonth.slice(0, -1);
      newPrice =
        (pricePerDay - (percent / 100) * pricePerDay) * numberOfDaysToRent;
      return { price: newPrice, percent: `${percent}%`, days: "month" };
    }
    if (numberOfDaysToRent >= 7 && numberOfDaysToRent < 30) {
      const percent = discountAboveWeek.slice(0, -1);
      newPrice =
        (pricePerDay - (percent / 100) * pricePerDay) * numberOfDaysToRent;
      return { price: newPrice, percent: `${percent}%`, days: "week" };
    }
  };

  const makeOrder = async (e) => {
    const data = {
      carId: car.car_id,
      ownerEmail: car.owner_email,
      renterEmail: auth.user_email,
      startDate: dates.startDate,
      endDate: dates.endDate,
      totalPrice: calculateDiscount().price,
    };
    dispatch(setCarToRental(data));
    try {
      if (auth) {
        if (
          (auth.license === null || auth.license === "") &&
          image.length === 0
        ) {
          setIsTakenMessage(`You must Upload license first`);
          setTimeout(() => {
            setIsTakenMessage(false);
          }, 3500);
          return;
        }
        const rental = await axios.post("/api/v1/rentals/new", {
          data: {
            rentalDetails: data,
            userDetails: auth,
          },
        });

        // If order succeed redirect to summery
        if (rental.status === 201) {
          dispatch(setRentalDetails(rental.data.data));
          setRedirect("/summery");
        }
      } else {
        dispatch(setShowLogin(true));
        setShowMessage(true);
        console.log("must log in first!");
      }
    } catch (error) {
      // If in the middle of the order, someone else took this car
      if (error.response.status === 400) {
        setIsTakenMessage(
          `Oops.. someone just pick the car. \nyou are redirect to your favorite`
        );
        setTimeout(() => {
          setRedirect("/favorite");
          setIsTakenMessage(false);
        }, 3500);
      }
      console.log(error);
    }
    try {
      if (auth.license === null) {
        const arr = ["User", ["license"], auth.user_email, [image]];
        await axios.post("/api/v1/users/updateitems", { data: arr });

        dispatch(setAuthLicense(image));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const imageToBinary = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = async () => {
      const data = await reader.result.split(",")[1];
      setImage(data);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="container-credit-and-summary">
      <div className="window">
        <div className="order-info">
          <div className="order-info-content">
            <div className="upper-info">
              <h2>Order Summary</h2>
              <div className="line" />
              {new Date(dates.startDate).toDateString()} -{" "}
              {new Date(dates.endDate).toDateString()}
            </div>
            <div className="lower-info">
              <table className="order-table">
                <tbody>
                  <tr>
                    <td>
                      <i className="fas fa-car"></i>
                      <span className="thin"> Car: </span> {car.brand},{" "}
                      {car.model}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="line" />
              <table className="order-table">
                <tbody>
                  <tr>
                    <td>
                      <i className="far fa-clock"></i>
                      <span className="thin"> Year: </span>
                      {car.year}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="line" />
              <table className="order-table">
                <tbody>
                  <tr>
                    <td>
                      <i className="fas fa-gas-pump"></i>
                      <span className="thin"> Fuel: </span>
                      {car.fuel}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="line" />
              <table className="order-table">
                <tbody>
                  <tr>
                    <td>
                      <i className="fas fa-cogs"></i>
                      <span className="thin"> Gear: </span>
                      {car.gear}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="line" />
              <table className="order-table">
                <tbody>
                  <tr>
                    <td>
                      <Icon icon={seatPassenger} />
                      <span className="thin"> Passengers: </span>
                      {car.passengers}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="line" />
            </div>
            <div className="total">
              <span style={{ float: "left" }}>
                <div className="thin dense">Initial Price:</div>
                {calculateDiscount().percent && (
                  <div className="thin dense">{`discount for ${
                    calculateDiscount().days
                  }:`}</div>
                )}
                TOTAL
              </span>
              <span style={{ float: "right", textAlign: "right" }}>
                <div className="thin dense">{`${getNumberOfRentalDays()} x
                   ${car.price_per_day} =
                   ${getNumberOfRentalDays() * car.price_per_day} $`}</div>
                {calculateDiscount().percent && (
                  <div className="thin dense">{`${
                    calculateDiscount().percent
                  } , - ${Number(
                    getNumberOfRentalDays() * car.price_per_day -
                      calculateDiscount().price
                  ).toFixed(2)} $`}</div>
                )}
                {Number(calculateDiscount().price).toFixed(2)}$
              </span>
            </div>
          </div>
        </div>

        <div className="credit-info">
          <div className="credit-info-content">
            <Cards
              cvc={data.cvc}
              expiry={data.expiry}
              focus={data.focus}
              name={data.name}
              number={data.number}
            />
            Card Number
            <input
              className="input-field"
              type="text"
              name="number"
              placeholder="Card Number"
              onChange={handleInputChange}
              maxLength="16"
            />
            Card Holder
            <input
              className="input-field"
              type="text"
              name="name"
              placeholder="Your Name"
              onChange={handleInputChange}
            />
            <table className="half-input-table">
              <tbody>
                <tr>
                  <td>
                    Expires
                    <input
                      className="input-field"
                      type="date"
                      name="expiry"
                      placeholder="Expire Date"
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    CVC
                    <input
                      className="input-field"
                      type="number"
                      name="cvc"
                      placeholder="CVC"
                      onChange={handleInputChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            {auth.license === null && (
              <div>
                <label>Upload license</label>
                <input
                  className="upload-photo-rental"
                  type="file"
                  onChange={(e) => imageToBinary(e)}
                  placeholder="upload license"
                ></input>
              </div>
            )}
            <button className="pay-btn" onClick={makeOrder}>
              Order
            </button>
          </div>
        </div>
      </div>
      {showMessage && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={true}
          message={"In our terms, you must login first"}
          key={"top" + "center"}
        />
      )}
      {isTakenMessage && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={true}
          message={isTakenMessage}
          key={"top" + "center"}
        />
      )}
      {redirect && <Redirect push to={redirect} />}
    </div>
  );
}
