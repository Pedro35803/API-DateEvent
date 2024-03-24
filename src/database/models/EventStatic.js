const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const EventStatic = sequelize.define("eventStatic", {
  idEvent: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    references: {
      model: sequelize.model["Event"],
      key: "id",
    },
  },
  day: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 31,
    },
  },
  month: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 12,
    },
  },
});

module.exports = EventStatic;
