module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "auth",
      [
        {
          user_email: "eyal@gmail.com",
          full_name: "Eyal",
          password: "12345",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "jino@gmail.com",
          full_name: "Jino",
          password: "12345",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "eliav@gmail.com",
          full_name: "Eliav",
          password: "42345",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "lea.shosh@walla.co.il",
          full_name: "Lea Shoshnik",
          password: "22345",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "oded.mar@hotmail.com",
          full_name: "Oded Margalit",
          password: "42345",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("auth", null, {});
  },
};
