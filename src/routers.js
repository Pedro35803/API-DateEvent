const express = require('express');
const router = express.Router();

const DiasController = require('./controller/Dias');
const EventosController = require('./controller/Eventos');

router.get("/dias", (req, res) => DiasController.all);

router.get("/eventos", (req, res) => EventosController.all);

module.exports = router;