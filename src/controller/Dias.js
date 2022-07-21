require('../database/models/Dias');
require('dotenv').config();

const { QueryTypes } = require('sequelize');
const sequelize = require('../database/sequelize');
const Dias = require("../database/models/Dias");

module.exports = {
    async getDias(req, res, next) {
        await sequelize.query("SELECT * FROM dias", { type: QueryTypes.SELECT })
            .then((resultado) => res.json(resultado))
            .catch(next);
    },

    async getDiaEspercifico(req, res, next) {
        const diaEnviado = req.params.diaDoAno;

        await sequelize.query("SELECT * FROM dias WHERE diaDoAno = 1", { 
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
    },

    async create(req, res, next) {
        const { diaDoAno, diaDoMes, mes } = req.body;
        const chaveDada = req.params.key;
        const chaveAdmin = process.env.KEY_ADM;

        if (chaveDada == chaveAdmin) {
            await Dias.create({diaDoAno, diaDoMes, mes})
                .then((resultado) => {
                    res.status(201).json(resultado)
                })
                .catch(next);
        } else {
            res.status(403).send("Operação negada, você não tem acesso de administrador");
        }

    }
}