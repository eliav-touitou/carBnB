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
        {
          user_email: "yone@gmail.com",
          full_name: "jino rozma",
          password: "1232131231345",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "zimermaneyal@gmail.com",
          full_name: "eyal zim",
          password: "4243534636345",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "rozjino@hotmail.com",
          full_name: "rozi jinobigo",
          password: "423rewr45",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "mosemose@hotmail.com",
          full_name: "mose mose",
          password: "423887784hh45",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "gil@hotmail.com",
          full_name: "gil naaman",
          password: "liav",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "yoel@hotmail.com",
          full_name: "yoel moshe-salomon",
          password: "1234",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "mose@hotmail.com",
          full_name: "mose cohen",
          password: "1234",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "dodo1212@hotmail.com",
          full_name: "dodo levi",
          password: "1234",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "asfasa@hotmail.com",
          full_name: "asaf dadon",
          password: "1234",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "eli@hotmail.com",
          full_name: "eliyaho abir",
          password: "1234",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "michel@hotmail.com",
          full_name: "michel davidi",
          password: "1234",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "meirav@hotmail.com",
          full_name: "meirav solah",
          password: "1234",
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
