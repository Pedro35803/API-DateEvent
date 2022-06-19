const Dias = require('../database/models/Dias');

module.exports = {
    all(req, res, next) {
        Dias.findAll()
            .then((resultado) => res.json(resultado))
            .catch(next);
    },

    create(req, res, next) {
        const { diaDoAno, diaDoMes, mes } = req.body;

        Dias.create(diaDoAno, diaDoMes, mes)
            .then((resultado) => {
                res.status(201).json(resultado)
            })
            .catch(next);
    }
}