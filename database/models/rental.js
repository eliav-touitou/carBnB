"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rental extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Rental.init(
    {
      rental_id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      car_id: DataTypes.INTEGER,
      owner_id: DataTypes.INTEGER,
      renter_id: DataTypes.INTEGER,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      total_price: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "Rental",
      tableName: "rentals",
      underscored: true,
    }
  );
  return Rental;
};
