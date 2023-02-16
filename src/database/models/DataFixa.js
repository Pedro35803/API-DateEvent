const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Evento = require('./Eventos');

const DataFixa = sequelize.define('data_fixa', {
  id_evento: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Evento,
      key: 'id'
    }
  },
  dia: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  mes: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'data_fixa',
  primaryKey: true
});

DataFixa.belongsTo(Evento, { foreignKey: 'id_evento' });

module.exports = DataFixa;
