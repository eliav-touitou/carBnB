const models = require("./models");
const { User, Car, Rental } = require("./models");
const { Op, Sequelize, where } = require("sequelize");
const { sequelize } = require("./models");

const getItem = async (table, row, id) => {
  const query = `SELECT * FROM ${table} where ${row} = ${id}`;
  try {
    const result = await sequelize.query({
      query,
    });
    return JSON.stringify(result, null, 2);
  } catch (err) {
    throw err;
  }
};

const getAllItems = async (table) => {
  try {
    const data = await table.findAll();
    return JSON.stringify(data, null, 2);
  } catch (err) {
    throw err;
  }
};

//test 1
getItem("users", "user_id", 2).then((x) => {
  console.log(x);
});

//test 2
getAllItems(Car).then((x) => {
  console.log(x);
});

module.exports = { getItem };
