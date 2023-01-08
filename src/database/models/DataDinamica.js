const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');
const Eventos = require("./Eventos")

const DataDinamica = sequelize.define("data_dinamica", {
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
        primaryKey: true
    },
    mes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    },
    ano: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
    }
});

const init = async () => {
    await DataDinamica.sync({force: true});
}

init();

module.exports = DataDinamica;