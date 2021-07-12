"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("cars", "available_from", {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn("cars", "available_until", {
      type: Sequelize.DATE,
    });
    await queryInterface.addColumn("cars", "gear", {
      type: Sequelize.STRING,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("cars", "available_from");
    await queryInterface.removeColumn("cars", "available_until");
    await queryInterface.removeColumn("cars", "gear");
  },
};
