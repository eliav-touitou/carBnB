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
      transaction_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      car_id: DataTypes.INTEGER,
      owner_email: DataTypes.STRING,
      renter_email: DataTypes.STRING,
      start_date: DataTypes.DATE,
      end_date: DataTypes.DATE,
      total_price: DataTypes.FLOAT,
      is_active: DataTypes.STRING,
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
