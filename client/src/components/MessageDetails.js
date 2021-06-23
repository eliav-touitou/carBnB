import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function MessageDetails() {
  const { messageId } = useParams();
  const notifications = useSelector((state) => state.notifications);
  const [statusButton, setStatusButton] = useState(false);
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
    <div>
      {message.content}
      {statusButton && (
        <p>
          <button onClick={updateRentalStatus}>accept</button> |{" "}
          <button>reject</button>
        </p>
      )}
      <button onClick={updateUnRead}>unread this message</button>
    </div>
  );
}
