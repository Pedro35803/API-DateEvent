const sequelize = require('../database/sequelize');
const { QueryTypes } = require('sequelize');

const Eventos = require("../database/models/Eventos")
const DataFixa = require("../database/models/DataFixa")
const DataDinamica = require("../database/models/DataDinamica")

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    async getFeriados(req, res, next) {     
        const eventosFeriados = await Eventos.findAll({
            where: {
                tipo: ['Feriado', 'Facultativo']
            }
        }).then((response) => res.json(response))
        .catch(next);

        console.log(eventosFeriados)

        // const data_evento = await DataFixa.find({

        // })
    },

    // async getEventosHoje(req, res, next) {
    //     const data = new Date();
    //     data.setUTCHours(data.getHours() - 3);
    //     const dia = data.getDate();
    //     const mes = data.getMonth() + 1;

    //     await sequelize.query(`${selectDefault} where d.dia_do_mes = ${dia} and d.mes = ${mes}`, {
    //         type: QueryTypes.SELECT
    //     }).then((resultado) => res.json(resultado))
    //     .catch(next);
    // },

    // async getQuantEventos(req, res, next) {
    //     await sequelize.query(`Select count(*) From eventos`,{
    //         type: QueryTypes.SELECT
    //     }).then((resultado) => {
    //         req.quantEventos = resultado[0].count;
    //         next();
    //     }).catch(() => res.send("Ocorreu um error ao tentar acessar a quantidade de eventos"));
    // },

    // async getRandom(req, res, next) {
    //     const idAleatorio = getRandomInt(1, req.quantEventos);

    //     await sequelize.query(`${selectDefault} where e.id = ${idAleatorio}`,{
    //         type: QueryTypes.SELECT
    //     }).then((resultado) => res.json(resultado))
    //     .catch(next);
    // },

    // async getEventosId(req, res, next) {
    //     const id = req.params.id;

    //     await sequelize.query(`${selectDefault} where e.id = ${id}`,{
    //         type: QueryTypes.SELECT
    //     }).then((resultado) => res.json(resultado))
    //     .catch(next);
    // },

    // async getEventosDiaDoAno(req, res, next) {
    //     const dia = req.params.dia;

    //     await sequelize.query(`${selectDefault} where d.dia_do_Ano = ${dia}`,{
    //         type: QueryTypes.SELECT
    //     }).then((resultado) => res.json(resultado))
    //     .catch(next);
    // },

    // async getEventosDiaDoMes(req, res, next) {
    //     const dia = req.params.dia;
    //     const mes = req.params.mes;

    //     await sequelize.query(`${selectDefault} where d.dia_do_mes = ${dia} and d.mes = ${mes}`,{
    //         type: QueryTypes.SELECT
    //     }).then((resultado) => res.json(resultado))
    //     .catch(next);
    // }
    }