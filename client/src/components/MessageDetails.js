import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { setNotifications, setNotificationCounter } from "../actions";

export default function MessageDetails() {
  const dispatch = useDispatch();
  const { messageId } = useParams();
  const notifications = useSelector((state) => state.notifications);
  const [statusButton, setStatusButton] = useState(false);
  const message = notifications[messageId];
  const auth = useSelector((state) => state.auth);

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
  }, [notifications]);

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
        <button onClick={updateUnRead}>unread this message</button>
      </div>
    </div>
  );
}
