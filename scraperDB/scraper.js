require("dotenv").config();
const { Rental } = require("../database/models");
const {
  getAllItems,
  deleteItems,
  addNewNotification,
  getAllOptionalFinishOrders,
  updateItemToDB,
} = require("../database/queries");
const {
  buildPatternsForCanceledRentals,
  buildPatternsForAfterRentalFinish,
  sendMail,
} = require("../backend/utils/helperFunctions");

const removePendingOrders = async () => {
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

const finishOrders = async () => {
  try {
    const allOptionalFinishOrders = await getAllOptionalFinishOrders(Rental);
    const arrOfRentalsId = [];
    allOptionalFinishOrders.forEach((order) => {
      if (new Date() > new Date(order.end_date)) {
        arrOfRentalsId.push(order);
      }
    });

    arrOfRentalsId.forEach(async (rental) => {
      // Build pattern texts for emails
      const { textToRenterAfterFinish } = buildPatternsForAfterRentalFinish({
        transactionId: String(rental.transaction_id),
      });

      const forRenter = {
        messageFrom: process.env.ADMIN_MAIL,
        messageTo: rental.renter_email,
        title: "Order Finished",
        content: textToRenterAfterFinish,
      };
      const objToUpdateDB = {
        table: Rental,
        column: ["is_active"],
        primaryKey: "transaction_id",
        primaryKeyValue: rental.transaction_id,
        content: ["finished"],
      };

      /////////////////////////////// need to fix email sending //////////////////////////////////////////
      // sendMail(forRenter);
      await updateItemToDB(objToUpdateDB);
      await addNewNotification(forRenter);
    });
  } catch (error) {
    console.log(error);
  }
};
finishOrders().then((res) => {
  console.log(res);
});

// Run every hour
setInterval(async () => {
  await removePendingOrders();
}, 3600000);

// Run every day
setInterval(async () => {
  await finishOrders();
}, 86400000);
