const express = require("express");
const router = express.Router();

const APIController = require("../controller/Api");

router.get("/feriados", APIController.getHoliday);
router.get("/eventos", APIController.getEventsHandle);
router.get("/eventos/random", APIController.getRandom);
router.get("/eventos/hoje", APIController.getEventsToday);

module.exports = router;
