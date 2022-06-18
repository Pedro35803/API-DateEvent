const { Sequelize } = require('sequelize');

const hostDoBD = process.env.DATABASE_URL;

const sequelize = new Sequelize(hostDoBD, {
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