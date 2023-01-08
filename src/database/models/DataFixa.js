const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Eventos = require("./Eventos")

const DataFixa = sequelize.define("data_fixa", {
    id_evento: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        references: {
            model: Eventos,
            key: "id"
        }
    },
    dia: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    mes: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

const init = async () => {
    await DataFixa.sync({force: true});
}

init();

// DataFixa.hasOne(Eventos)

module.exports = DataFixa;