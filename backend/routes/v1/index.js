// process.setMaxListeners(0);
const { Router } = require("express");
const v1 = Router();
const { getItemFromDB } = require("../../../database/queries");
const { User, Auth, Car, Rental } = require("../../../database/models");
const models = require("../../../database/models");
const cars = require("./cars");
const users = require("./users");
const rentals = require("./rentals");

v1.use("/cars", cars);
v1.use("/users", users);
v1.use("/rentals", rentals);

v1.post("/getitem", async (req, res) => {
  const { data } = req.body;
  //   console.log(data);
  const model = models[`${data[0]}`];

  const objToSearchBy = { model: model, column: data[1], columnValue: data[2] };
  try {
    const itemFound = await getItemFromDB(objToSearchBy);
    console.log(itemFound);
    if (itemFound.length === 0) {
      return res.status(404).json({ message: "NOT FOUND" });
    }
    return res.status(200).json({ message: "Success", data: itemFound });
  } catch (err) {
    console.log(err.message);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: err.message });
  }
});

module.exports = v1;
