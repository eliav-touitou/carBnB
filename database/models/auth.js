"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Auth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.User, { foreignKey: "user_email" });
    }
  }
  Auth.init(
    {
      user_email: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      password: DataTypes.STRING,
      full_name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Auth",
      tableName: "auth",
      underscored: true,
    }
  );
  return Auth;
};
