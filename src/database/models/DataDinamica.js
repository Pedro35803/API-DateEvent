const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Evento = require('./Eventos');

const DataDinamica = sequelize.define('data_dinamica', {
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
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'data_dinamica',
  primaryKey: true
});

DataDinamica.belongsTo(Evento, { foreignKey: 'id_evento' });

module.exports = DataDinamica;
