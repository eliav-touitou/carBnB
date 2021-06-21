// process.setMaxListeners(0);
const { Router } = require("express");
const v1 = Router();
const { validToken } = require("../../utils/authentication");
const cars = require("./cars");
const users = require("./users");
const rentals = require("./rentals");
const search = require("./search");
const auth = require("./auth");
const favorite = require("./favorite");
const notification = require("./notification");

v1.use("/cars", cars);
v1.use("/users", users);
v1.use("/rentals", rentals);
v1.use("/search", search);
v1.use("/auth", auth);
v1.use("/favorite", validToken, favorite);
v1.use("/notification", notification);

module.exports = v1;
