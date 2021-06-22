// require("dotenv").config();
const { Rental } = require("../database/models");
const {
  getAllItems,
  deleteItems,
  addNewNotification,
} = require("../database/queries");
const {
  buildPatternsForCanceledRentals,
} = require("../backend/utils/helperFunctions");

const nodemailer = require("nodemailer");
const adminEmail = "rozjino@gmail.com";

transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rozjino@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

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

    rentalToRemove.forEach((rental) => {
      // Build pattern texts for emails
      const { textToCanceledRenter, textToCanceledOwner } =
        buildPatternsForCanceledRentals({
          transactionId: String(result.transaction_id),
        });

      /// ## Can build those obj with outer function ## ///
      const mailsOption = [
        (mailToRenterOptions = {
          from: adminEmail,
          to: rental.renter_email,
          subject: "Order Canceled",
          text: textToCanceledRenter,
        }),
        (mailToOwnerOptions = {
          from: adminEmail,
          to: rental.owner_email,
          subject: "Order Canceled",
          text: textToCanceledOwner,
        }),
      ];

      mailsOption.forEach((mail) => {
        transporter.sendMail(mail, (error, info) => {
          if (error) {
            console.log(error);
          } else {
            console.log(info);
          }
        });
      });

      await addNewNotification({
        messageFrom: adminEmail,
        messageTo: rental.renter_email,
        title: "Order Canceled",
        content: textToCanceledRenter,
      });
      await addNewNotification({
        messageFrom: adminEmail,
        messageTo: rental.owner_email,
        title: "Order Canceled",
        content: textToCanceledOwner,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
scrapeDB();
