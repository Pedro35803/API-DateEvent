const event = require("../database/crud/event");

module.exports = {
  async getAll(req, res, next) {
    const allEvents = await event.getAll();
    res.json(allEvents);
  },

  async getByID(req, res, next) {
    const { id } = req.params;
    await event.getExistOrThrow(id);

    const result = await event.getById(id);
    res.json(result);
  },

  async create(req, res, next) {
    const response = await event.create(req.body);
    res.status(201).json(response);
  },

  async createMany(req, res, next) {
    const response = await event.createMany(req.body);
    res.status(201).json(response);
  },

  async update(req, res, next) {
    const { id } = req.params;
    const response = await event.update(req.body, id);
    res.status(203).json(response);
  },
  
  async updateType(req, res, next) {
    const { id } = req.params;
    const response = await event.updateType(req.body, id);
    res.status(203).json(response);
  },

  async destroy(req, res, next) {
    const { id } = req.params;
    const response = await event.destroy(id);
    res.status(204).json(response);
  },
};
