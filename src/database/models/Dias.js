const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Dias = sequelize.define("dias", {
    diaDoAno: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate: {
            min: 1,
            max: 366
        }
    },
    diaDoMes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 31
        }
    },
    mes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 12
        }
    }
});

const init = async () => {
    await Dias.sync();
}

init();

module.exports = Dias;