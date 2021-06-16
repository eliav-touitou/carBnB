module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "rentals",
      [
        {
          transaction_id: 1,
          car_id: 3,
          owner_email: "eliav@gmail.com",
          renter_email: "eyal@gmail.com",
          start_date: new Date(23 - 04 - 2021),
          end_date: new Date(06 - 05 - 2021),
          total_price: 70,
          is_active: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          transaction_id: 2,
          car_id: 5,
          owner_email: "oded.mar@hotmail.com",
          renter_email: "lea.shosh@walla.co.il",
          start_date: new Date(25 - 05 - 2021),
          end_date: new Date(27 - 06 - 2021),
          total_price: 110,
          is_active: true,
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
