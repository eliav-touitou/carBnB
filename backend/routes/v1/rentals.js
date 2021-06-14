const { Router } = require("express");
const rentals = Router();
const { getAllItems, getItem } = require("../../../database");
const { Rental } = require("../../../database/models");

rentals.post("/uniquerental", async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const car = await getItem("rentals", "rental_id", id);
    console.log(car);
    res.status(200).json(car);
  } catch (err) {
    console.log(err.message);
    res.status(404).json("NOT FOUND");
  }
});
rentals.get("/allrentals", async (req, res) => {
  try {
    const rentals = await getAllItems(Rental);
    console.log(rentals);
    res.status(200).json(car);
  } catch (err) {
    console.log(err.message);
    res.status(404).json("NOT FOUND");
  }
});

module.exports = rentals;
