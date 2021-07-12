const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const api = require("./routes");
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 })
);

app.use(express.static("./build"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

app.use("/api", api);

module.exports = app;
