const express = require('express');
const router = express.Router();

const DiasController = require('./controller/Dias');
const EventosController = require('./controller/Eventos');
const APIController = require('./controller/Api');

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

router.get("/api/v1/feriados/2022", APIController.getFeriados)

router.get("/api/v1/eventos/random", APIController.getQuantEventos, APIController.getRandom)

router.get("/api/v1/eventos/id/:id", APIController.getEventosId)

router.get("/api/v1/eventos/diaDoAno/:dia", APIController.getEventosDiaDoAno)

router.get("/api/v1/eventos/dia/mes/:dia/:mes", APIController.getEventosDiaDoMes)

module.exports = router;