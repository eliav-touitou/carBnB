"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("users", "license", {
      type: Sequelize.TEXT("long"),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("users", "license");
  },
};
