const express = require('express');
const router = express.Router();

const DiasController = require('./controller/Dias');
const EventosController = require('./controller/Eventos');

router.route("/api/dias/api_key/:key")
    .get(DiasController.getDias)
    .post(DiasController.create)
    .put(DiasController.update)
    .delete(DiasController.destroy);

router.route("/api/eventos/api_key/:key")
    .get(EventosController.getEventos)
    .post(EventosController.create)
    .put(EventosController.update)
    .delete(EventosController.destroy);

router.get("/api/dias", DiasController.getDias);

router.get("/api/dias/:diaDoAno", DiasController.getDiaDoAno);

router.get("/api/eventos", EventosController.getEventos);

router.get("/api/eventos/:id", EventosController.getEventosId);

module.exports = router;