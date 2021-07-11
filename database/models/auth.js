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
      this.belongsTo(models.User, {
        foreignKey: "user_email",
        targetKey: "user_email",
      });
    }
  }
  Auth.init(
    {
      user_email: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      password: DataTypes.STRING,
      full_name: DataTypes.STRING,
      reset_code: {
        allowNull: true,
        type: DataTypes.STRING,
      },
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
