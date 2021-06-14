const { Router } = require("express");
const users = Router();
const { getAllItems, getItem } = require("../../../database");
const { User } = require("../../../database/models");

users.post("/uniqueuser", async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const car = await getItem("users", "user_id", id);
    console.log(car);
    res.status(200).json(car);
  } catch (err) {
    console.log(err.message);
    res.status(404).json("NOT FOUND");
  }
});
users.get("/allusers", async (req, res) => {
  try {
    const users = await getAllItems(User);
    console.log(users);
    res.status(200).json(car);
  } catch (err) {
    console.log(err.message);
    res.status(404).json("NOT FOUND");
  }
});

module.exports = users;
