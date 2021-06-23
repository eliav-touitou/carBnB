import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "../actions";
import Messages from "./Messages";

export default function Notifications() {
  const auth = useSelector((state) => state.auth);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  const getAllNewMessages = async () => {
    try {
      if (auth) {
        const { data: messages } = await axios.post(
          "/api/v1/notification/messages",
          {
            data: { email: auth.user_email },
          }
        );
        dispatch(setNotifications(messages.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {notifications?.map((message, i) => (
        <Messages message={message} key={`message-${i}`} messageId={i} />
      ))}
      <button onClick={getAllNewMessages}>refresh</button>
    </div>
  );
}
