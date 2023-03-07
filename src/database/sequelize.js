const { Sequelize } = require('sequelize');
require('dotenv').config()

const database = process.env.DB_NAME;
const usuario = process.env.DB_USER;
const senha = process.env.DB_PASSWORD;

const sequelize = new Sequelize(database, usuario, senha, {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'postgres',
    define: {
        underscored: true,
        timestamps: true
    }
});

sequelize.authenticate()
    .then(() => console.log("DataBase connected whit sucess"))
    .catch((error) => console.log("DataBase not connected, error: " + error));

module.exports = sequelize;