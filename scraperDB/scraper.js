// require("dotenv").config();
const { Rental } = require("../database/models");
const { getAllItems, deleteItems } = require("../database/queries");
const rentalToRemove = [];

const scrapeDB = async () => {
  try {
    const data = await getAllItems(Rental);
    data.forEach((rental) => {
      const diff = new Date().getTime() - new Date(rental.createdAt).getTime();
      const hoursDiff = Math.floor(diff / 3600000);
      if (hoursDiff >= 12 && rental.is_active === "pending") {
        rentalToRemove.push(rental.transaction_id);
      }
    });
    await deleteItems(Rental, "transaction_id", rentalToRemove);
  } catch (error) {
    console.log(error);
  }
};
scrapeDB();
