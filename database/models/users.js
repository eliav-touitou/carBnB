"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.Auth, { foreignKey: "user_email" });
      this.hasMany(models.Car, { foreignKey: "user_email" });
    }
  }
  User.init(
    {
      phone_number: { type: DataTypes.STRING, primaryKey: true },
      first_name: DataTypes.STRING,
      user_email: DataTypes.STRING,
      last_name: DataTypes.STRING,
      address: DataTypes.STRING,
      rating: DataTypes.FLOAT,
      number_of_votes: DataTypes.INTEGER,
      license: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      underscored: true,
    }
  );
  return User;
};
