import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setNotifications, setNotificationCounter } from "../actions";
import Rating from "@material-ui/lab/Rating";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

export default function MessageDetails() {
  const dispatch = useDispatch();
  const { messageId } = useParams();

  // Redux states
  const notifications = useSelector((state) => state.notifications);
  const auth = useSelector((state) => state.auth);

  // Use states
  const [statusButton, setStatusButton] = useState(false);
  const [value, setValue] = useState(0);
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
  }, []);

  const updateRentalStatus = async (e) => {
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
      console.log(updateUser);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="message-div-container">
      <div className="message-div-details">
        {message.content.slice(3, message.content.length - 4)}
        {statusButton && (
          <p>
            <button onClick={updateRentalStatus}>accept</button> |{" "}
            <button>reject</button>
          </p>
        )}
        {message.title === "Order Finished" && value === 0 ? (
          <div id="rating-background">
            <div id="rating-container">
              <Box component="fieldset" mb={3} borderColor="transparent">
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
              </Box>
            </div>
          </div>
        ) : null}
        <button onClick={updateUnRead}>unread this message</button>
      </div>
    </div>
  );
}
