const Eventos = require('../database/models/Eventos');

module.exports = {
    all(req, res, next) {
        Eventos.findAll()
            .then((resultado) => res.json(resultado))
            .catch(next);
    }
}