const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Eventos = sequelize.define("eventos", {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    evento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo: {
        type: DataTypes.STRING,
        defaultValue: "Evento Comum",
    },
    ocorrencia: {
        type: DataTypes.STRING,
        defaultValue: "Fixa",
    }
});

const init = async () => {
    await Eventos.sync({force: true});
}

init();

module.exports = Eventos;