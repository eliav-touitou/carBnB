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
      this.hasOne(models.Auth, {
        foreignKey: "user_email",
        sourceKey: "user_email",
      });
      this.hasMany(models.Car, {
        foreignKey: "owner_email",
        targetKey: "user_email",
      });
      // this.belongsToMany(models.Car, {
      //   through: "Favorite",
      //   foreignKey: "user_email",
      // });
    }
  }
  User.init(
    {
      user_email: { type: DataTypes.STRING, primaryKey: true },
      phone_number: DataTypes.STRING,
      first_name: DataTypes.STRING,
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
