const { Router } = require("express");
const users = Router();
const {
  getAllItems,
  getUserOrAuth,
  addToUsersDB,
  addToAuthDB,
} = require("../../../database/queries");
const { User, Auth } = require("../../../database/models");
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");

// Gets a unique user
users.post("/uniqueuser", async (req, res) => {
  const { email } = req.body;
  console.log(email);
  try {
    const user = await getUserOrAuth(User, email);
    console.log(user);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: "NOT FOUND", error: error.message });
  }
});

// Get all users
users.get("/allusers", async (req, res) => {
  try {
    const users = await getAllItems(User);
    console.log(users);
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.log(error.message);
    res.status(404).json({ message: "NOT FOUND", error: error.message });
  }
});

// Create new auth and user
users.post("/register", async (req, res) => {
  try {
    const { newUser } = req.body;
    const { firstName, lastName, address, phoneNumber, email, password } =
      newUser;
    const auth = await getUserOrAuth(Auth, email);

    if (!auth) {
      newAuthObj.password = hashSync(newUser.password, genSaltSync(10));

      await addToUsersDB({ firstName, lastName, address, phoneNumber, email });
      await addToAuthDB({ password, email, firstName, lastName });
      newUser.password = undefined;

      res.status(200).json({ success: true, data: newUser });
    } else {
      res.status(409).json({ success: true, message: "User already exist" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "NOT FOUND", error: error.message });
  }
});

module.exports = users;
