const express = require('express');
const router = express.Router();

const DiasController = require('./controller/Dias');
const EventosController = require('./controller/Eventos');

router.get("/dias", DiasController.getDias);
router.get("/eventos", EventosController.getEventos);

module.exports = router;