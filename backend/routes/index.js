const { Router } = require("express");
const api = Router();
const v1 = require("./v1");

api.use("/v1", v1);

module.exports = api;
