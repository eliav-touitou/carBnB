module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "rentals",
      [
        {
          transaction_id: 1,
          car_id: 3,
          owner_id: 3,
          renter_id: 1,
          start_date: new Date(23 - 04 - 2021),
          end_date: new Date(06 - 05 - 2021),
          total_price: 70,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          transaction_id: 2,
          car_id: 5,
          owner_id: 5,
          renter_id: 4,
          start_date: new Date(25 - 05 - 2021),
          end_date: new Date(07 - 06 - 2021),
          total_price: 110,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("rentals", null, {});
  },
};
