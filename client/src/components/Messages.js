import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export default function Messages({ message, messageId, setVisibility }) {
  const updateRead = async () => {
    try {
      await axios.patch("/api/v1/notification/updateread", {
        data: { id: message?.id, status: "read" },
      });
      setVisibility(false);
    } catch (error) {
      console.log(error);
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
