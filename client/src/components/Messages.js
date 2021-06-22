import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export default function Messages({ message, messageId }) {
  const updateRead = async () => {
    await axios.patch("/api/v1/notification/updateread", {
      data: { id: message.id, status: "read" },
    });
  };
  return (
    <div>
      <Link onClick={updateRead} to={`message/${messageId}`}>
        <p>title: {message.title}</p>
        <p>{new Date(message.createdAt).toDateString()}</p>
      </Link>
    </div>
  );
}
