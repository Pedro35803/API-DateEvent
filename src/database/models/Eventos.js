const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Eventos = sequelize.define("eventos", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    diaDoAno: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Dias',
            key: 'diaDoAno'
        }
    },
    evento: {
        type: DataTypes.STRING,
        allowNull: false,
    }
});

const init = async () => {
    await Eventos.sync();
}

init();

module.exports = Eventos;