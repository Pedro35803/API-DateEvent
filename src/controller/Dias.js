const { keyAccepted, menssageDenied } = require("../keyController/keyAccepted");
const Dias = require("../database/models/Dias");

module.exports = {
    async getDias(req, res, next) {
        await Dias.findAll()
            .then((resultado) => res.json(resultado))
            .catch(next);
    },

    async getDiaDoAno(req, res, next) {
        const diaEnviado = req.params.diaDoAno;

        await Dias.findOne({ 
            where: { 
                diaDoAno : diaEnviado
            }
        }).then((resultado) => res.json(resultado))
        .catch(next);
    },

    async getDiaDoMes(req, res, next) {
        const diaNumero = req.params.dia;
        const mesNumero = req.params.mes;

        await Dias.findOne({ 
            where: { 
                diaDoMes : diaNumero,
                mes : mesNumero
            }
        }).then((resultado) => res.json(resultado))
        .catch(next);
    },

    async create(req, res, next) {
        const { diaDoAno, diaDoMes, mes } = req.body;
        
        if (keyAccepted(req.params.key)) {
            await Dias.create({diaDoAno, diaDoMes, mes})
                .then((resultado) => res.status(201).json(resultado))
                .catch(next);
        } else {
            res.status(403).send(menssageDenied);
        }
    },

    async update(req, res, next) {
        const { diaDoAno, diaDoMes, mes } = req.body;

        if (keyAccepted(req.params.key)) {
            await Dias.update(
                {
                    diaDoMes: diaDoMes, 
                    mes: mes
                },
                {where: {
                    diaDoAno: diaDoAno
                }}
            ).then((resultado) => res.status(204).json(resultado))
            .catch(next);
        } else {
            res.status(403).send(menssageDenied);
        }
    },

    async destroy(req, res, next) {
        const { diaDoAno } = req.body;

        if (keyAccepted(req.params.key)) {
            await Dias.destroy({
                where: {
                    diaDoAno: diaDoAno
                }
            }).then((resultado) => res.status(204).json(resultado))
            .catch(next);
        } else {
            res.status(403).send(menssageDenied);
        }
    }
}