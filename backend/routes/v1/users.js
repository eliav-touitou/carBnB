const { Router } = require("express");
const users = Router();
const { getAllItems, getItem, addUserToDB } = require("../../../database");
const { User } = require("../../../database/models");

// Gets a unique user
users.post("/uniqueuser", async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const user = await getItem("users", "user_id", id);
    console.log(user);
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: "NOT FOUND", error: err.message });
  }
});

// Get all users
users.get("/allusers", async (req, res) => {
  try {
    const users = await getAllItems(User);
    console.log(users);
    res.status(200).json({ success: true, data: users });
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: "NOT FOUND", error: err.message });
  }
});

users.post("/upload", async (req, res) => {
  try {
    const { newUser } = req.body;
    console.log(req.body);
    console.log(newUser);
    await addUserToDB(newUser);
    res.status(200).json({ success: true, data: newUser });
  } catch (err) {
    res.status(404).json({ message: "NOT FOUND", error: err.message });
  }
});

module.exports = users;
