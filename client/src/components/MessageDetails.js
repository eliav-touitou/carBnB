import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function MessageDetails() {
  const { messageId } = useParams();
  const notifications = useSelector((state) => state.notifications);

  const updateUnRead = async () => {
    try {
      await axios.patch("/api/v1/notification/updateread", {
        data: { id: notifications[messageId].id, status: "unread" },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {notifications[messageId].content}
      <button onClick={updateUnRead}>unread this message</button>
    </div>
  );
}
