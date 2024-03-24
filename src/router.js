const express = require("express");
const router = express.Router();

const isAuthenticated = require("./middlewares/authenticator");
const EventController = require("./controller/Event");
const AdminController = require("./controller/Admin");
const APIController = require("./controller/Api");

router.get("/feriados", APIController.getFeriados);

router.get("/eventos/hoje", APIController.getEventosHoje);

router.get("/eventos/random", APIController.getRandom);

router.get("/eventos/diaDoAno/:dia", APIController.getEventosDiaDoAno);

router.get("/eventos/dia/:dia/mes/:mes", APIController.getEventosDiaDoMes);

router
  .route("/eventos")
  .get(isAuthenticated, EventController.getAll)
  .post(isAuthenticated, EventController.create);

router
  .route("/eventos/:id")
  .get(EventController.getByID)
  .put(isAuthenticated, EventController.update)
  .patch(isAuthenticated, EventController.update)
  .delete(isAuthenticated, EventController.destroy);

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
