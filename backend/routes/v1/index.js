// process.setMaxListeners(0);
const { Router } = require("express");
const v1 = Router();

const cars = require("./cars");
const users = require("./users");
const rentals = require("./rentals");
const search = require("./search");
const auth = require("./auth");

v1.use("/cars", cars);
v1.use("/users", users);
v1.use("/rentals", rentals);
v1.use("/search", search);
v1.use("/auth", auth);

module.exports = v1;
