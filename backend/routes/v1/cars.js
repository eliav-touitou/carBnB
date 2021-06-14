const { Router } = require("express");
const cars = Router();
const { getAllItems, getItem } = require("../../../database");
const { Car } = require("../../../database/models");

cars.post("/uniquecar", async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const car = await getItem("cars", "car_id", id);
    console.log(car);
    res.status(200).json(car);
  } catch (err) {
    console.log(err.message);
    res.status(404).json("NOT FOUND");
  }
});
cars.get("/allcars", async (req, res) => {
  try {
    const cars = await getAllItems(Car);
    console.log(cars);
    res.status(200).json(cars);
  } catch (err) {
    console.log(err.message);
    res.status(404).json("NOT FOUND");
  }
});

module.exports = cars;
