require('../database/models/Dias');
const { QueryTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

module.exports = {
    async getDias(req, res, next) {
        await sequelize.query("SELECT * FROM dias", { type: QueryTypes.SELECT })
            .then((resultado) => res.json(resultado))
            .catch(next);
    }
}