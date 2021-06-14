"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("cars", {
      car_id: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      owner_email: {
        type: Sequelize.STRING,
      },
      brand: {
        type: Sequelize.STRING,
      },
      year: {
        type: Sequelize.INTEGER,
      },
      model: {
        type: Sequelize.STRING,
      },
      fuel: {
        type: Sequelize.STRING,
      },
      price_per_day: {
        type: Sequelize.FLOAT,
      },
      price_per_week: {
        type: Sequelize.FLOAT,
      },
      price_per_month: {
        type: Sequelize.FLOAT,
      },
      is_rented: {
        type: Sequelize.BOOLEAN,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("cars");
  },
};
