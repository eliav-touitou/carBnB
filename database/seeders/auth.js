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
          user_email: "Efi@gmail.com",
          full_name: "Efi Tirsh",
          password: "0542732556",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "Eitan.ach@gmail.com",
          full_name: "Eitan Ach",
          password: "0505732998",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "Pittie@gmail.com",
          full_name: "Pittie Leshem",
          password: "0525732117",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "lior.amz@walla.co.il",
          full_name: "Lior Amzalleg",
          password: "0545985666",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "Meshi.B@hotmail.com",
          full_name: "Meshi Barouch",
          password: "0589678778",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "Sonia@gmail.com",
          full_name: "Sonia Fish",
          password: "0588623778",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "Eyal.Shani@gmail.com",
          full_name: "Eyal Shani",
          password: "0589623678",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "Elizour@hotmail.com",
          full_name: "Elizour Pour",
          password: "0589623778",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "Moshe@hotmail.com",
          full_name: "Moshe Rabenu",
          password: "0589623778",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          user_email: "Harry@hotmail.com",
          full_name: "Harry Potter",
          password: "058963778",
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
