const Dias = require('../database/models/Dias');

module.exports = {
    async all(req, res, next) {
        await Dias.findAll()
            .then((resultado) => res.json(resultado))
            .catch(next);
    }
}