const Eventos = require("../database/models/Eventos")

async function getQuantEventos() {
    const count = Eventos.findAndCountAll()
        .then(events => events.count)
        .catch(err => console.error(err))
        
    return count;
}

module.exports = getQuantEventos;