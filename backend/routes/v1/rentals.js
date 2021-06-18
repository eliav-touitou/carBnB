const { Router } = require("express");
const rentals = Router();
const { getAllItems, getRental } = require("../../../database/queries");
const { Rental } = require("../../../database/models");

// Gets a unique rental
rentals.post("/uniquerental", async (req, res) => {
  const { id } = req.body;
  // console.log(id);
  try {
    const rental = await getRental(id);
    console.log(rental);
    if (!rental) {
      return res.status(404).json({ message: "NOT FOUND" });
    }
    return res.status(200).json({ success: true, data: rental });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: error.message });
  }
});

// Get all rentals
rentals.get("/allrentals", async (req, res) => {
  try {
    const rentals = await getAllItems(Rental);

    if (rentals.length === 0) {
      return res.status(404).json({ message: "NOT FOUND" });
    }
    return res.status(200).json({ success: true, data: rentals });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ message: "Problems with our server", error: error.message });
  }
});

module.exports = rentals;
