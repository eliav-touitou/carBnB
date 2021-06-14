const { Router } = require("express");
const v1 = Router();

const cars = require("./cars");

v1.use("/cars", cars);

module.exports = v1;
