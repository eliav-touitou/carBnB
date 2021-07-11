import React from "react";
import { useSelector } from "react-redux";
import Messages from "./Messages";

export default function Notifications({ setVisibility }) {
  // Redux states
  const notifications = useSelector((state) => state.notifications);

  return (
    <div className="all-notifications-container">
      {notifications?.map((message, i) => (
        <Messages
          setVisibility={setVisibility}
          message={message}
          key={`message-${i}`}
          messageId={i}
        />
      ))}
    </div>
  );
}
