import React from "react";
import { Link } from "react-router-dom";

export default function Messages({ message, messageId }) {
  return (
    <div>
      <Link to={`message/${messageId}`}>
        <p>title: {message.title}</p>
        <p>{new Date(message.createdAt).toDateString()}</p>
      </Link>
    </div>
  );
}
