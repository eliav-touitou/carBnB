"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Photo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Car, {
        foreignKey: "car_id",
        targetKey: "car_id",
      });
    }
  }
  Photo.init(
    {
      file: DataTypes.TEXT("long"),
      car_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Photo",
      tableName: "photos",
      underscored: true,
    }
  );
  return Photo;
};
