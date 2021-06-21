import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function MessageDetails() {
  const { messageId } = useParams();
  const notifications = useSelector((state) => state.notifications);
  return <div>{notifications[messageId].content}</div>;
}
