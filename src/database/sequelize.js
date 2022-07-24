const { Sequelize } = require('sequelize');
require('dotenv').config()

const hostDoBD = process.env.DATABASE_URL;

const sequelize = new Sequelize(hostDoBD, {
    define: {
        underscored: true,
    },
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});

sequelize.authenticate()
    .then(() => console.log("Conectado ao Banco de Dados com sucesso"))
    .catch((error) => console.log("Ocorreu um error ao se comunicar com o BD: " + error));

module.exports = sequelize;