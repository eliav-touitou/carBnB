import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotifications } from "../actions";
import Messages from "./Messages";

export default function Notifications() {
  const auth = useSelector((state) => state.auth);
  const notifications = useSelector((state) => state.notifications);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .post("/api/v1/notification/messages", {
        data: { email: auth.user_email },
      })
      .then((messages) => {
        dispatch(setNotifications(messages));
      })
      .catch((err) => console.log(err.message));
  }, []);

  return (
    <div>
      {notifications?.map((message, i) => {
        <Messages message={message} key={`message-${i}`} messageId={i} />;
      })}
    </div>
  );
}
