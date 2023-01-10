const { Sequelize } = require('sequelize');
require('dotenv').config()

const database = process.env.DB_NAME;
const usuario = process.env.DB_USER;
const senha = process.env.DB_PASSWORD;

const sequelize = new Sequelize(database, usuario, senha, {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_HOST || 'postgres',
    define: {
        underscored: true
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