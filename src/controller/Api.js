const Eventos = require("../database/models/Eventos");

const countEvents = require("../services/countEvents");
const { 
    getTodayInDayOfYear 
} = require("../services/date")

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

    async getEventosHoje(req, res, next) {
        const diaDoAno = getTodayInDayOfYear()
        console.log(diaDoAno)

        await Eventos.findAll({
            where: { diaDoAno }
        }).then((event) => res.json(event))
        .catch(next);
    },

    async getRandom(req, res, next) {
        const count = await countEvents();
        
        if (count === 0) throw new Error("DataBase is empty");
        
        const id = getRandomInt(1, count);

        await Eventos.findOne({
            where: { id }
        }).then((event) => res.json(event))
        .catch(next);
    },

    async getEventosId(req, res, next) {
        const id = req.params.id;

        await Eventos.findOne({
            where: { id }
        }).then((event) => {
            if (!event) throw new Error("Id not exists")
            res.json(event)
        }).catch(next);
    },

    async getEventosDiaDoAno(req, res, next) {
        const diaDoAno = req.params.dia;

        if (diaDoAno <= 0 && 366 < diaDoAno) 
            throw new Error("Day of year not exists")

        await Eventos.findAll({
            where: { diaDoAno }
        }).then((event) => res.json(event))
        .catch(next);
    },

    // async getEventosDiaDoMes(req, res, next) {
    //     const dia = req.params.dia;
    //     const mes = req.params.mes;

    //     await sequelize.query(`${selectDefault} where d.dia_do_mes = ${dia} and d.mes = ${mes}`,{
    //         type: QueryTypes.SELECT
    //     }).then((resultado) => res.json(resultado))
    //     .catch(next);
    // }
}