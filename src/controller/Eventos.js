const Eventos = require('../database/models/Eventos');

module.exports = {
    all(req, res, next) {
        Eventos.findAll()
            .then((resultado) => res.json(resultado))
            .catch(next);
    },

    create(req, res, next) {
        const { id, diaDoAno, evento } = req.body;

        Eventos.create(id, diaDoAno, evento)
            .then((resultado) => {
                res.status(201).json(resultado)
            })
            .catch(next);
    }
}