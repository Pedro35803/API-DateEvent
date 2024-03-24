const express = require("express");
const router = express.Router();

const APIController = require("../controller/Api");

router.get("/feriados", APIController.getFeriados);
router.get("/eventos", APIController.getEventsHandle);
router.get("/eventos/hoje", APIController.getEventosHoje);
router.get("/eventos/random", APIController.getRandom);

module.exports = router;
