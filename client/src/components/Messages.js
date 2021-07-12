import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setSpinner } from "../actions";

export default function Messages({ message, messageId, setVisibility }) {
  const dispatch = useDispatch();

  const updateRead = async () => {
    dispatch(setSpinner(true));

    try {
      await axios.patch("/api/v1/notification/updateread", {
        data: { id: message?.id, status: "read" },
      });
      setVisibility(false);
      dispatch(setSpinner(false));
    } catch (error) {
      console.log(error);
      dispatch(setSpinner(false));
    }
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
