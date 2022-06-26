require('../database/models/Eventos');
const { QueryTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

module.exports = {
    async getEventos(req, res, next) {
        await sequelize.query("SELECT * FROM eventos", { type: QueryTypes.SELECT })
            .then((resultado) => res.json(resultado))
            .catch(next);
    }
}