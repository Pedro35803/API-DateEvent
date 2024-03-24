const { Event } = require("../database/models/Event");

async function getQuantEventos() {
  const count = Event.findAndCountAll()
    .then((event) => event.count)
    .catch((err) => console.error(err));

  return count;
}

module.exports = getQuantEventos;
