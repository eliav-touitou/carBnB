import React from "react";
import { Link } from "react-router-dom";

export default function Messages({ message, messageId }) {
  return (
    <div>
      <Link to={`message/${messageId}`}>
        <p>title: {message.title}</p>
        <p>{message.create_at}</p>
      </Link>
    </div>
  );
}
