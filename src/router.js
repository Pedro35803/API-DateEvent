const express = require('express');
const router = express.Router();

const APIController = require('./controller/Api');
// const Authenticator = require("./services/Authenticator")

router.get("/feriados", APIController.getFeriados);

// router.get("/api/v1/eventos/hoje", APIController.getEventosHoje);

// router.get("/api/v1/eventos/random", APIController.getQuantEventos, APIController.getRandom);

// router.get("/api/v1/eventos/id/:id", APIController.getEventosId);

// router.get("/api/v1/eventos/diaDoAno/:dia", APIController.getEventosDiaDoAno);

// router.get("/api/v1/eventos/dia/mes/:dia/:mes", APIController.getEventosDiaDoMes);

module.exports = router;