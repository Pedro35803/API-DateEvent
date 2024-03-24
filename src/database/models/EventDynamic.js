const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const EventDynamic = sequelize.define("eventDynamic", {
  idEvent: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    references: {
      model: sequelize.model["Event"],
      key: "id",
    },
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = EventDynamic;
