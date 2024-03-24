const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");

const Event = sequelize.define("event", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM(["Evento Comum", "Feriado"]),
    defaultValue: "Evento Comum",
  },
  isDynamic: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

module.exports = Event;
