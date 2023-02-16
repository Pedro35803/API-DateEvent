const Eventos = require("../database/models/Eventos");
const DataDinamica = require("../database/models/DataFixa");
const DataFixa = require("../database/models/DataDinamica");

const countEvents = require("../services/countEvents");

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = {
    async getFeriados(req, res, next) {     
        await Eventos.findAll({
            where: {
                tipo: ['Feriado', 'Facultativo']
            }
        }).then((response) => res.json(response))
        .catch(next);
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

    async getRandom(req, res, next) {
        const count = await countEvents();
        
        if (count === 0) throw new Error("DataBase is empty");
        
        const id = getRandomInt(1, count);

        await Eventos.findOne({
            where: { id }
        }).then((event) => res.json(event))
        .catch(next);
    },

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