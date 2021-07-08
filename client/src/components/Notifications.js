import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "../actions";
import Messages from "./Messages";

export default function Notifications({ setVisibility }) {
  const auth = useSelector((state) => state.auth);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

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
