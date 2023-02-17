const eventos = require('../database/crud/eventos');

module.exports = {
    async getEventos(req, res, next) {
        res.json(eventos.getAll())
    },

    async create(req, res, next) {
        const response = eventos.create( ...req.body );
        res.status(201).json(response);
    },

    async update(req, res, next) {
        const { id } = req.body;
        const response = await eventos.update( ...req.body, id )
        res.status(204).json(response)
    },

    async destroy(req, res, next) {
        const { id } = req.body;
        const response = await eventos.destroy( id )
        res.status(204).json(response)
    }
}