const { Router } = require("express");
const rentals = Router();
const { getAllItems, getRental } = require("../../../database/queries");
const { Rental } = require("../../../database/models");

// Gets a unique rental
rentals.post("/uniquerental", async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const rental = await getRental(id);
    console.log(rental);
    res.status(200).json({ success: true, data: rental });
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: "NOT FOUND", error: err.message });
  }
});

// Get all rentals
rentals.get("/allrentals", async (req, res) => {
  try {
    const rentals = await getAllItems(Rental);
    console.log(rentals);
    res.status(200).json({ success: true, data: rentals });
  } catch (err) {
    console.log(err.message);
    res.status(404).json({ message: "NOT FOUND", error: err.message });
  }
});

module.exports = rentals;
