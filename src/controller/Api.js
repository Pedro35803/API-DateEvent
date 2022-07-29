// const Dias = require("../database/models/Dias");
// const Eventos = require('../database/models/Eventos');

const sequelize = require('../database/sequelize');
const { QueryTypes, Sequelize } = require('sequelize');
const { Op } = require("sequelize");

module.exports = {
    async getFeriados(req, res, next) {
        // await Eventos.findAll({
        //     attributes: ['evento', 'tipo'],
        //     where: {
        //         tipo: ['Facultativo', 'Feriado']
        //     },
        //     include: {
        //         model: Dias,
        //         required: true,
        //         attributes: ['diaDoMes', 'mes']
        //     }
        await sequelize.query("Select e.evento, e.tipo, (d.dia_do_mes || '/' || d.mes) as Data from eventos e inner join dias d on d.dia_do_ano = e.dia_do_ano where e.tipo in ('Feriado', 'Facultativo')", {
            type: QueryTypes.SELECT
        }).then((resultado) => res.json(resultado))
        .catch(next);
    }
}