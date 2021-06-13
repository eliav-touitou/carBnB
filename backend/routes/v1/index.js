const { Router } = require("express");
const v1 = Router();

const test = require("./test");

v1.use("/test", test);

module.exports = v1;
