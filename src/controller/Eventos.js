const { keyAccepted, menssageDenied } = require("../keyController/keyAccepted");
const Eventos = require('../database/models/Eventos');
const sequelize = require('../database/sequelize');
const { QueryTypes } = require('sequelize');

module.exports = {
    async getEventos(req, res, next) {
        await sequelize.query("SELECT * FROM eventos", { type: QueryTypes.SELECT })
            .then((resultado) => res.json(resultado))
            .catch(next);
    },

    async getEventosId(req, res, next) {
        const idEnviado = req.params.id;

        await sequelize.query("SELECT * FROM eventos WHERE id = ?", { 
            type: QueryTypes.SELECT, 
            replacements: [ idEnviado ]
        }).then((resultado) => res.json(resultado))
        .catch(next);
    },

    async create(req, res, next) {
        const { evento, tipo, diaDoAno } = req.body;
        
        if (keyAccepted(req.params.key)) {
            await Eventos.create({evento, tipo, diaDoAno})
                .then((resultado) => res.status(201).json(resultado))
                .catch(next);
        } else {
            res.status(403).send(menssageDenied);
        }
    },

    async update(req, res, next) {
        const { id, evento, tipo, diaDoAno } = req.body;

        if (keyAccepted(req.params.key)) {
            await Eventos.update(
                {
                    evento: evento,
                    tipo: tipo,
                    diaDoAno: diaDoAno
                },
                {where: {
                    id: id
                }}
            ).then((resultado) => res.status(204).json(resultado))
            .catch(next);
        } else {
            res.status(403).send(menssageDenied);
        }
    },

    async destroy(req, res, next) {
        const { id } = req.body;

        if (keyAccepted(req.params.key)) {
            await Eventos.destroy({
                where: {
                    id: id
                }
            }).then((resultado) => res.status(204).json(resultado))
            .catch(next);
        } else {
            res.status(403).send(menssageDenied);
        }
    }
}