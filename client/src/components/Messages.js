import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "../actions";

export default function Messages({ message, messageId }) {
  const dispatch = useDispatch();

  // Redux states
  const auth = useSelector((state) => state.auth);
  const notifications = useSelector((state) => state.notifications);

  const updateRead = async () => {
    await axios.patch("/api/v1/notification/updateread", {
      data: { id: message?.id, status: "read" },
    });
  };

  return (
    <div className="message-container">
      <Link onClick={updateRead} to={`/message/${messageId}`}>
        <div className={`read-${String(message?.read)}`}>
          <div className="message-title"> {message?.title}</div>
          <div className="footer-message">
            <span className="date-span-message">
              {new Date(message?.createdAt).toDateString()}{" "}
              {message.read ? null : <span className="bullet-message">•</span>}
            </span>
            <span> from: {message.message_from}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}
