const express = require('express');
const router = express.Router();

const isAuthenticated = require("./middlewares/authenticator");
const EventosController = require("./controller/Eventos");
const APIController = require('./controller/Api');

router.get("/feriados", APIController.getFeriados);

router.get("/eventos/hoje", APIController.getEventosHoje);

router.get("/eventos/random", APIController.getRandom);

router.get("/eventos/id/:id", APIController.getEventosId);

router.get("/eventos/diaDoAno/:dia", APIController.getEventosDiaDoAno);

router.get("/eventos/dia/:dia/mes/:mes", APIController.getEventosDiaDoMes);

router.route("/crud/eventos")
    .get(isAuthenticated, EventosController.getEventos)
    .post(isAuthenticated, EventosController.create)

router.route("/crud/eventos/:id")
    .get(isAuthenticated, APIController.getEventosId)
    .put(isAuthenticated, EventosController.update)
    .patch(isAuthenticated, EventosController.update)
    .delete(isAuthenticated, EventosController.destroy)

module.exports = router;