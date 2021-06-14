const { Car } = require("./models");
const { Op, Sequelize, where } = require("sequelize");

const getCar = async (carId) => {
  try {
    const result = await Car.findOne({
      subQuery: false,
      where: { id: carId },
    });
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

getCar(2);
