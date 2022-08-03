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

        await sequelize.query(`${selectDefault} where e.id = ${idAleatorio}`,{
            type: QueryTypes.SELECT
        }).then((resultado) => res.json(resultado))
        .catch(next);
    },

    async getEventosId(req, res, next) {
        const id = req.params.id;

        await sequelize.query(`${selectDefault} where e.id = ${id}`,{
            type: QueryTypes.SELECT
        }).then((resultado) => res.json(resultado))
        .catch(next);
    },

    async getEventosDiaDoAno(req, res, next) {
        const dia = req.params.dia;

        await sequelize.query(`${selectDefault} where d.dia_do_Ano = ${dia}`,{
            type: QueryTypes.SELECT
        }).then((resultado) => res.json(resultado))
        .catch(next);
    },

    async getEventosDiaDoMes(req, res, next) {
        const dia = req.params.dia;
        const mes = req.params.mes;

        await sequelize.query(`${selectDefault} where d.dia_do_mes = ${dia} and d.mes = ${mes}`,{
            type: QueryTypes.SELECT
        }).then((resultado) => res.json(resultado))
        .catch(next);
    }
}