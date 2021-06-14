const { Router } = require("express");
const v1 = Router();

const cars = require("./cars");
const users = require("./users");
const rentals = require("./rentals");

v1.use("/cars", cars);
v1.use("/users", users);
v1.use("/rentals", rentals);

module.exports = v1;
