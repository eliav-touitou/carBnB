const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const api = require("./routes");
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", api);

module.exports = app;
