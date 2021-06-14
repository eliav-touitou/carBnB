const { Router } = require("express");
const cars = Router();
const { getCar } = require("../../../database");

cars.get("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const car = await getCar(id);
    res.status(200).json(car);
  } catch (err) {
    res.status(404).json("NOT FOUND");
  }
});

module.exports = cars;
