"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  Favorite.init(
    {
      car_id: DataTypes.INTEGER,
      user_email: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Favorite",
      tableName: "favorites",
      underscored: true,
    }
  );
  return Favorite;
};
