const Dias = require("../database/models/Dias");

module.exports = {
    async getDias(req, res, next) {
        await Dias.findAll()
            .then((resultado) => res.json(resultado))
            .catch(next);
    },

    async create(req, res, next) {
        const { diaDoAno, diaDoMes, mes } = req.body;
        
        await Dias.create({diaDoAno, diaDoMes, mes})
            .then((resultado) => res.status(201).json(resultado))
            .catch(next);
    },

    async update(req, res, next) {
        const { diaDoAno, diaDoMes, mes } = req.body;

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
    },

    async destroy(req, res, next) {
        const { diaDoAno } = req.body;

        await Dias.destroy({
            where: {
                diaDoAno: diaDoAno
            }
        }).then((resultado) => res.status(204).json(resultado))
        .catch(next);
    }
}