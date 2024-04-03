const Event = require("../../models/Event");

const destroy = (id) => {
  const response = Event.destroy({ where: { id } });
  return response;
};

module.exports = { destroy };
