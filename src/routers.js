const express = require('express');
const router = express.Router();

const DiasController = require('./controller/Dias');
const EventosController = require('./controller/Eventos');

router.get("/dias", DiasController.getDias);

router.post("/dias/:key", DiasController.create);

router.get("/dias/:diaDoAno", DiasController.getDiaDoAno);

router.get("/dias/:dia/:mes", DiasController.getDiaDoMes);

router.get("/eventos", EventosController.getEventos);

module.exports = router;