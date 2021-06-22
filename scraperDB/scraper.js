// require("dotenv").config();
const { Rental } = require("../database/models");
const { getAllItems } = require("../database/queries");

const scrapeDB = async () => {
  try {
    const data = await getAllItems(Rental);
    data.forEach((rental) => {
      console.log("created at");
      console.log(new Date(rental.createdAt).getTime());
      console.log("update at");
      console.log(new Date(rental.updatedAt).getTime());
      console.log("update at - created at");
      console.log(
        new Date(rental.updatedAt).getTime() -
          new Date(rental.createdAt).getTime()
      );
      const diff =
        new Date(rental.updatedAt).getTime() -
        new Date(rental.createdAt).getTime();
      console.log("current diff hours");
      const hours = Math.floor(diff / 60 / 60);
      console.log(Math.floor(hours));
      console.log("===========================");
    });
  } catch (error) {
    console.log(error);
  }
};
scrapeDB();

// setInterval(() => {
//   scrapeDB()
//     .then((result) => {
//       console.log("Success");
//     })
//     .catch((err) => {
//       console.log("Failed");
//     });
// }, 360000);
