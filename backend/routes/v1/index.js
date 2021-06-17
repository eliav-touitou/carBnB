// process.setMaxListeners(0);
const { Router } = require("express");
const v1 = Router();

const cars = require("./cars");
const users = require("./users");
const rentals = require("./rentals");
const search = require("./search");
const googleLogin = require("./googlelogin");

v1.use("/cars", cars);
v1.use("/users", users);
v1.use("/rentals", rentals);
v1.use("/search", search);
v1.use("/googlelogin", googleLogin);

module.exports = v1;
