"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: "owner_email" });
    }
  }

  Car.init(
    {
      car_id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      owner_email: DataTypes.STRING,
      brand: DataTypes.STRING,
      year: DataTypes.INTEGER,
      model: DataTypes.STRING,
      fuel: DataTypes.STRING,
      passengers: DataTypes.INTEGER,
      price_per_day: DataTypes.FLOAT,
      price_per_week: DataTypes.FLOAT,
      price_per_month: DataTypes.FLOAT,
      is_rented: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Car",
      tableName: "cars",
      underscored: true,
    }
  );
  return Car;
};
