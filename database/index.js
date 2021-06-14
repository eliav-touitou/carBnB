const models = require("./models");
// const { Car } = require("./models");
const { Op, Sequelize, where } = require("sequelize");
const { sequelize } = require("./models");

const getItem = async (table, row, id) => {
  const query = `SELECT * FROM ${table} where ${row} = ${id}`;
  // const query = "fish";
  try {
    const result = await sequelize.query({
      query,
    });
    return result;
  } catch (err) {
    throw err;
  }
};

getItem("users", "user_id", 5).then((x) => {
  console.log(x);
});

module.exports = { getItem };
