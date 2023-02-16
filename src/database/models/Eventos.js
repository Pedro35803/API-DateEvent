const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Evento = sequelize.define('eventos', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  evento: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING(255),
    defaultValue: 'Evento Comum'
  },
  ocorrencia: {
    type: DataTypes.STRING(255),
    defaultValue: 'Fixa'
  }
});

const init = async () => {
  await Evento.sync({ force: true });
}

init();

module.exports = Evento;