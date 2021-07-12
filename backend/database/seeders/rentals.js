const date = new Date();
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
          start_date: new Date(),
          end_date: new Date(date.setMonth(date.getMonth() + 2)),
          total_price: 70,
          is_active: "confirm",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          transaction_id: 2,
          car_id: 5,
          owner_email: "oded.mar@hotmail.com",
          renter_email: "lea.shosh@walla.co.il",
          start_date: new Date(),
          end_date: new Date(date.setMonth(date.getMonth() + 2)),
          total_price: 110,
          is_active: "reject",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          transaction_id: 3,
          car_id: 4,
          owner_email: "lea.shosh@walla.co.il",
          renter_email: "oded.mar@hotmail.com",
          start_date: new Date(),
          end_date: new Date(date.setMonth(date.getMonth() + 2)),
          total_price: 1150,
          is_active: "reject",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          transaction_id: 4,
          car_id: 2,
          owner_email: "lea.shosh@walla.co.il",
          renter_email: "oded.mar@hotmail.com",
          start_date: new Date(),
          end_date: new Date(date.setMonth(date.getMonth() + 1)),
          total_price: 130,
          is_active: "pending",
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
