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

    async getEventosHoje(req, res, next) {
        const date = new Date();
        date.setUTCHours(date.getHours() - 3);
        const dia = date.getDate();
        const mes = date.getMonth() + 1;
        const ano = date.getFullYear();

        const allDinamic = await DataDinamica.findAll({
            where: { dia, mes, ano }
        });

        const allFix = await DataFixa.findAll({
            where: { dia, mes },
            include: { all }
        })

        res.json(allFix)

        // await Eventos.findAll({
        //     where: { id }
        // }).then((event) => res.json(event))
        // .catch(next);
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
        const dia = req.params.dia;

        await Eventos.findAll({
            where: { id }
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