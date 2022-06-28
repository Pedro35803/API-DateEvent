require('../database/models/Dias');
const { query } = require('express');
const { QueryTypes } = require('sequelize');
const sequelize = require('../database/sequelize');

module.exports = {
    async getDias(req, res, next) {
        await sequelize.query("SELECT * FROM dias", { type: QueryTypes.SELECT })
            .then((resultado) => res.json(resultado))
            .catch(next);
    },

    async getDiaEspercifico(req, res, next) {
        const diaEnviado = req.params.diaDoAno;

        await sequelize.query("SELECT * FROM dias WHERE diaDoAno = ?", { 
                replacements: [diaEnviado],
                type: QueryTypes.SELECT 
            })
            .then((resultado) => res.json(resultado))
            .catch(next);
    },

    async getDiaDoAno(req, res, next) {
        const diaNumero = req.params.dia;
        const mesNumero = req.params.mes;

        await sequelize.query("SELECT * FROM dias WHERE diaDoMes = :dia and mes = :mes", {
                replacements: { 
                    dia: diaNumero, 
                    mes: mesNumero
                },
                type: QueryTypes.SELECT 
            })
            .then((resultado) => res.json(resultado))
            .catch(next);
    }
}