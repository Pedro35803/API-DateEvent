const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const EventDynamic = sequelize.define("eventDynamic", {
  idEvent: {
    type: DataTypes.INTEGER,
    primaryKey: true,
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
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = EventDynamic;
