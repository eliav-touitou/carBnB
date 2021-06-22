const { Router } = require("express");
const notification = Router();
const { getItemFromDB, updateItemToDB } = require("../../../database/queries");
const { Notification } = require("../../../database/models");

// Get all messages to user
notification.post("/messages", async (req, res) => {
  const { data } = req.body;
  const messagesByParameters = {
    model: Notification,
    column: ["message_to"],
    columnValue: [data.email],
  };
  try {
    const allMessages = await getItemFromDB(messagesByParameters);
    return res.status(200).json({ success: true, data: allMessages });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Problems with our server", error: error.message });
  }
});

notification.patch("/updateread", async (req, res) => {
  const { data } = req.body;
  let objToUpdate = {};
  //////// need to change - get content changes from params or body //////
  if (data.status === "read") {
    objToUpdate = {
      table: Notification,
      column: ["read"],
      primaryKey: "id",
      primaryKeyValue: data.id,
      content: [true],
    };
  } else {
    objToUpdate = {
      table: Notification,
      column: ["read"],
      primaryKey: "id",
      primaryKeyValue: data.id,
      content: [false],
    };
  }
  console.log(objToUpdate);
  try {
    await updateItemToDB(objToUpdate);
    return res
      .status(200)
      .json({ success: true, message: "Success to update" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Problems with our server", error: error.message });
  }
});

module.exports = notification;
