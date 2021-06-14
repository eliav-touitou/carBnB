const { Router } = require("express");
const users = Router();
const {
  getAllItems,
  getItem,
  addToUsers,
  addToAuth,
} = require("../../../database");
const { User } = require("../../../database/models");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

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

// Create new user
users.post("/register", async (req, res) => {
  try {
    const { newUser } = req.body;
    const { firstName, lastName, address, phoneNumber, email } = newUser;

    if (!(await getItem("auth", "email", email))) {
      newUser.password = hashSync(newUser.password, genSaltSync(10));
      await addToUsers({ firstName, lastName, address, phoneNumber, email });
      await addToAuth({
        password: newUser.password,
        email,
        firstName,
        lastName,
      });
      res.status(200).json({ success: true, data: newUser });
    } else {
      res.status(409).json({ success: true, message: "User already exist" });
    }
  } catch (err) {
    res.status(500).json({ message: "NOT FOUND", error: err.message });
  }
});

module.exports = users;
