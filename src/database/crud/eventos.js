const Eventos = require('../models/Eventos');

const getAll = async () => {
    const response = await Eventos.findAll();
    return response;
}

const create = async ({ nome, tipo, diaDoAno }) => {
    const response = await Eventos.create({ nome, tipo, diaDoAno });
    return response;
}

const update = async ({ nome, tipo, diaDoAno }, id) => {
    const update = {};

    if (nome) update.nome = nome;
    if (tipo) update.tipo = tipo;
    if (diaDoAno) update.diaDoAno = diaDoAno;

    const response = await Eventos.update(
        update,
        { where: { id } }
    );
    return response;
}

const destroy = (id) => {
    const response = Eventos.destroy({ where: { id } });
    return response;
}

module.exports = { getAll, create, update, destroy }