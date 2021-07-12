require("dotenv").config();
module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  },
  test: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME_TEST,
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  },
  production: {
    username: "b697bd44c965e9",
    password: process.env.DB_PASSWORD_PRODUCTION,
    database: process.env.DB_NAME_PRODUCTION,
    host: process.env.DB_HOST_PRODUCTION,
    dialect: "mysql",
  },
};
