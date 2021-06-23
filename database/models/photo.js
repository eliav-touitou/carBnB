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
      // define association here
    }
  }
  Photo.init(
    {
      car_id: DataTypes.INTEGER,
      file: DataTypes.TEXT,
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
