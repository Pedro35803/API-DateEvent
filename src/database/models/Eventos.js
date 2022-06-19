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
    diaDoAno: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 366
        },
        references: {
            model: Dias,
            key: 'diaDoAno'
        }
    },
    evento: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
    }
});

const init = async () => {
    await Eventos.sync();
}

init();

module.exports = Eventos;