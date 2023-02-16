const { Sequelize } = require('sequelize');
require('dotenv').config()

const database = process.env.DB_NAME;
const usuario = process.env.DB_USER;
const senha = process.env.DB_PASSWORD;
const host = process.env.DB_HOST || 'localhost';
const port = process.env.DB_port || 5432;

const { Client } = require('pg')
const client = new Client({
    host, port, database,
    user: usuario,
    password: senha,
})

client.connect()
    .then(() => console.log("Conectado ao Banco de Dados com sucesso"))
    .catch((error) => console.log("Ocorreu um error ao se comunicar com o BD: " + error));

module.exports = client;