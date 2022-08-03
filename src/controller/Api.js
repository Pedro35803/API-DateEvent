const sequelize = require('../database/sequelize');
const { QueryTypes } = require('sequelize');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

const selectDefault = "Select e.evento, e.tipo, (d.dia_do_mes || '/' || d.mes) as Data from eventos e inner join dias d on d.dia_do_ano = e.dia_do_ano"

module.exports = {
    async getFeriados(req, res, next) {
        await sequelize.query(`${selectDefault} where e.tipo in ('Feriado', 'Facultativo')`, {
            type: QueryTypes.SELECT
        }).then((resultado) => res.json(resultado))
        .catch(next);
    },

    async getRandom(req, res, next) {
        const quantEventos = 600;

        const idAleatorio = getRandomInt(1, quantEventos);

        return await sequelize.query(`${selectDefault} where e.id = ${idAleatorio}`,{
            type: QueryTypes.SELECT
        }).then((resultado) => res.json(resultado))
        .catch(next);
    }
}