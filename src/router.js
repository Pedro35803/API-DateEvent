const express = require('express');
const router = express.Router();

const APIController = require('./controller/Api');
// const Authenticator = require("./services/Authenticator")

router.get("/feriados", APIController.getFeriados);

// router.get("/eventos/hoje", APIController.getEventosHoje);

router.get("/eventos/random", APIController.getRandom);

router.get("/error", () => {throw new Error("Aqui tem um error")})

// router.get("/eventos/id/:id", APIController.getEventosId);

// router.get("/eventos/diaDoAno/:dia", APIController.getEventosDiaDoAno);

// router.get("/eventos/dia/mes/:dia/:mes", APIController.getEventosDiaDoMes);

module.exports = router;