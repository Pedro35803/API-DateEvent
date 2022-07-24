const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Dias = require('./Dias');

const Eventos = sequelize.define("eventos", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
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

Dias.hasMany(Eventos, {
    foreignKey: 'diaDoAno',
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
});

module.exports = Eventos;