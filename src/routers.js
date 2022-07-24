const express = require('express');
const router = express.Router();

const DiasController = require('./controller/Dias');
const EventosController = require('./controller/Eventos');

router.route("/dias/:key")
    .get(DiasController.getDias)
    .post(DiasController.create)
    .put(DiasController.update)
    .delete(DiasController.destroy);

router.get("/dias", DiasController.getDias);

router.get("/dias/:diaDoAno", DiasController.getDiaDoAno);

router.get("/dias/:dia/:mes", DiasController.getDiaDoMes);

router.get("/eventos", EventosController.getEventos);

module.exports = router;