const express = require("express");
const router = express.Router();

const isAuthenticated = require("./middlewares/authenticator");
const EventosController = require("./controller/Eventos");
const AdminController = require("./controller/Admin");
const APIController = require("./controller/Api");

router.get("/feriados", APIController.getFeriados);

router.get("/eventos/hoje", APIController.getEventosHoje);

router.get("/eventos/random", APIController.getRandom);

router.get("/eventos/diaDoAno/:dia", APIController.getEventosDiaDoAno);

router.get("/eventos/dia/:dia/mes/:mes", APIController.getEventosDiaDoMes);

router
    .route("/eventos")
    .get(isAuthenticated, EventosController.getEventos)
    .post(isAuthenticated, EventosController.create);

router
    .route("/eventos/:id")
    .get(APIController.getEventosId)
    .put(isAuthenticated, EventosController.update)
    .patch(isAuthenticated, EventosController.update)
    .delete(isAuthenticated, EventosController.destroy);

router
    .route("/admin")
    .get(isAuthenticated, AdminController.getAllAdmins)
    .post(isAuthenticated, AdminController.create);

router
    .route("/admin/:id")
    .get(isAuthenticated, AdminController.getAdminById)
    .patch(isAuthenticated, AdminController.update)
    .delete(isAuthenticated, AdminController.destroy);

module.exports = router;
