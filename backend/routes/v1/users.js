const { Router } = require("express");
const users = Router();
const { hashSync, genSaltSync, compareSync } = require("bcrypt");
const { User, Auth } = require("../../../database/models");
const { createAccessToken, createRefreshToken } = require("../../cookieUtils");
const {
  getAllItems,
  getUserOrAuth,
  addToUsersDB,
  addToAuthDB,
} = require("../../../database/queries");

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
    const { firstName, lastName, address, phoneNumber, email } = newUser;
    const auth = await getUserOrAuth(Auth, email);

    if (!auth) {
      newUser.password = hashSync(newUser.password, genSaltSync(10));

      await addToUsersDB({ firstName, lastName, address, phoneNumber, email });
      await addToAuthDB({
        password: newUser.password,
        email,
        firstName,
        lastName,
      });
      newUser.password = undefined;

      const accessToken = createAccessToken(newUser);
      const refreshToken = createRefreshToken(newUser);
      res.cookie("Access-Token", `Bearer ${accessToken}`);
      res.cookie("Refresh-Token", `Bearer ${refreshToken}`);

      res.status(200).json({ success: true, data: newUser });
    } else {
      res.status(409).json({ success: true, message: "User already exist" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "NOT FOUND", error: error.message });
  }
});

users.post("/login", async (req, res) => {
  const { email, password } = req.body.user; // ##need to change maybe
  try {
    const auth = await getUserOrAuth(Auth, email);

    if (!auth) {
      return res
        .status(400)
        .json({ error: "Username or password is incorrect" });
    }
    const isPasswordCorrect = compareSync(password, auth.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ error: "Username or password is incorrect" });
    } else {
      const accessToken = createAccessToken(req.body);
      const refreshToken = createRefreshToken(req.body);
      res.cookie("Access-Token", `Bearer ${accessToken}`);
      res.cookie("Refresh-Token", `Bearer ${refreshToken}`);
      return res.status(200).json({ message: "login successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "NOT FOUND", error: error.message });
  }
});

// User logout
users.post("/logout", async (req, res) => {
  res.clearCookie("Access-Token");
  res.clearCookie("Refresh-Token");
  return res.status(200).json({ message: "success" });
});

module.exports = users;
