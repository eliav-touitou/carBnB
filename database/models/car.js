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
      this.belongsTo(models.User, {
        foreignKey: "owner_email",
        targetKey: "user_email",
      });
      this.hasMany(models.Photo, {
        foreignKey: "car_id",
        sourceKey: "car_id",
      });
      this.belongsToMany(models.User, {
        through: "Favorite",
        foreignKey: "car_id",
      });
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
      discount_for_week: DataTypes.STRING,
      discount_for_month: DataTypes.STRING,
      is_rented: DataTypes.BOOLEAN,
      available_from: DataTypes.DATE,
      available_until: DataTypes.DATE,
      gear: DataTypes.STRING,
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
