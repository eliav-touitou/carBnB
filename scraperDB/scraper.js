require("dotenv").config();
const { Rental } = require("../database/models");
const {
  getAllItems,
  deleteItems,
  addNewNotification,
} = require("../database/queries");
const {
  buildPatternsForCanceledRentals,
  sendMail,
} = require("../backend/utils/helperFunctions");

const scrapeDB = async () => {
  const rentalToRemoveIds = [];
  const rentalToRemove = [];
  try {
    const data = await getAllItems(Rental);
    data.forEach((rental) => {
      const diff = new Date().getTime() - new Date(rental.createdAt).getTime();
      const hoursDiff = Math.floor(diff / 3600000);
      if (hoursDiff >= 12 && rental.is_active === "pending") {
        rentalToRemoveIds.push(rental.transaction_id);
        rentalToRemove.push(rental);
      }
    });

    await deleteItems(Rental, "transaction_id", rentalToRemoveIds);

    rentalToRemove.forEach(async (rental) => {
      // Build pattern texts for emails
      const { textToCanceledRenter, textToCanceledOwner } =
        buildPatternsForCanceledRentals({
          transactionId: String(result.transaction_id),
        });

      forRenter = {
        from: process.env.ADMIN_MAIL,
        to: rental.renter_email,
        subject: "Order Canceled",
        text: textToCanceledRenter,
      };

      forOwner = {
        from: process.env.ADMIN_MAIL,
        to: rental.owner_email,
        subject: "Order Canceled",
        text: textToCanceledOwner,
      };

      sendMail(forRenter);
      sendMail(forOwner);
      await addNewNotification(forRenter);
      await addNewNotification(forOwner);
    });
  } catch (error) {
    console.log(error);
  }
};

setInterval(async () => {
  await scrapeDB();
}, 3600000);
