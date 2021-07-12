"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Notification.init(
    {
      message_from: DataTypes.STRING,
      message_to: DataTypes.STRING,
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      read: DataTypes.BOOLEAN,
      transaction_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Notification",
      tableName: "notifications",
      underscored: true,
    }
  );
  return Notification;
};
