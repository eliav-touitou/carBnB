import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io("localhost:3001");

export default function Notifications() {
  useEffect(() => {
    socket.on("renters", (data) => {
      console.log(data);
    });
    socket.emit(`sendToServer`, "client to server");
  }, []);

  return <div>{}</div>;
}
