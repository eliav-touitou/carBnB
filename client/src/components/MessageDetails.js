import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setNotifications, setNotificationCounter } from "../actions";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import messagePhoto from "../photos/message-photo.jpg";
import { Snackbar } from "@material-ui/core";

export default function MessageDetails() {
  const dispatch = useDispatch();
  const { messageId } = useParams();

  // Redux states
  const notifications = useSelector((state) => state.notifications);
  const auth = useSelector((state) => state.auth);

  // Use states
  const [statusButton, setStatusButton] = useState(false);
  const [value, setValue] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  const [listenToUnread, setListenToUnread] = useState(false);
  const message = notifications[messageId];

  useEffect(() => {
    axios
      .post("/api/v1/search/getitem", {
        data: ["Rental", ["transaction_id"], [message.transaction_id]],
      })
      .then(({ data: rental }) => {
        if (
          message.title === "New Order incoming" &&
          rental.data[0].is_active === "pending"
        )
          setStatusButton(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const updateUnRead = async () => {
    try {
      await axios.patch("/api/v1/notification/updateread", {
        data: { id: message.id, status: "unread" },
      });
      setListenToUnread((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let count = 0;
    try {
      if (auth) {
        axios
          .post("/api/v1/notification/messages", {
            data: { email: auth.user_email },
          })
          .then(({ data: messages }) => {
            messages.data?.forEach((message) => {
              if (message.read === false) {
                count++;
              }
            });
            dispatch(setNotificationCounter(count));
            dispatch(setNotifications(messages.data));
          });
      }
    } catch (error) {
      console.log(error);
    }
  }, [listenToUnread]);

  const updateRentalStatus = async (e) => {
    console.log(e);
    const status = e.target.innerText === "accept" ? "confirm" : "reject";
    try {
      await axios.patch("/api/v1/rentals/status", {
        data: {
          transactionId: message.transaction_id,
          status,
        },
      });
      setStatusButton(false);
    } catch (error) {
      console.log(error);
    }
  };

  const updateRating = async (newValue) => {
    setValue(newValue);
    try {
      const { data: uniqueRental } = await axios.post(
        "/api/v1/rentals/uniquerental",
        {
          id: String(message.transaction_id),
        }
      );
      const ownerEmail = uniqueRental.data.owner_email;

      const { data: user } = await axios.post("/api/v1/users/uniqueuser", {
        email: ownerEmail,
      });

      const prevRating = user.data.rating;
      const prevNumberOfVotes = user.data.number_of_votes;
      const newNumberOfVotes = user.data.number_of_votes + 1;
      const newRating =
        (prevRating * prevNumberOfVotes + value) / newNumberOfVotes;
      const arrToUpdate = [
        "User",
        ["rating", "number_of_votes"],
        ownerEmail,
        [newRating, newNumberOfVotes],
      ];

      const updateUser = await axios.post("/api/v1/users/updateitems", {
        data: arrToUpdate,
      });
      setShowMessage(true);
      console.log(updateUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setShowMessage(false);
    }, 4500);
  }, [showMessage]);

  return (
    <div className="message-details-container-blog-card">
      <div className="blog-card">
        <div className="meta">
          <img className="photo" height="255px" src={messagePhoto}></img>
          <div className="details">
            <div className="upper-section-message-photo">
              <div className="author">
                <i class="fas fa-user"></i> {auth.first_name} {auth.last_name}
              </div>
              <div className="date">
                <i class="far fa-calendar"></i>{" "}
                {new Date(message.updatedAt).toDateString()}
              </div>
            </div>
            <div className="tags">Regards CarBnB</div>
          </div>
        </div>
        <div className="description">
          <h1>
            {message.title}{" "}
            <div
              style={{
                visibility:
                  message.title === "Order Finished" && value === 0
                    ? "visible"
                    : "hidden",
              }}
              className="rating-panel-container"
            >
              <Typography id="rate-owner" component="legend">
                <br /> Rate Owner:
              </Typography>
              <Rating
                id="stars"
                size="large"
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  updateRating(newValue);
                }}
              />
            </div>
          </h1>
          <h2>Order Number {message.transaction_id}</h2>
          <p>{message.content.slice(3, message.content.length - 4)}</p>
          <div className="read-more">
            {statusButton && (
              <div>
                <a onClick={updateRentalStatus}>Accept</a> |{" "}
                <a onClick={updateRentalStatus}>reject</a>
              </div>
            )}
            <a className="read-later-hover" onClick={updateUnRead}>
              Read Later
            </a>
          </div>
        </div>
      </div>
      {showMessage && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={true}
          message={`Your rating was successfully updated`}
          key={"top" + "center"}
        />
      )}
    </div>
  );
}
