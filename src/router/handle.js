const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/authenticator");
const EventController = require("../controller/Event");
const AdminController = require("../controller/Admin");

router
  .route("/eventos")
  .get(isAuthenticated, EventController.getAll)
  .post(isAuthenticated, EventController.create);

router
  .route("/eventos/:id")
  .get(EventController.getByID)
  .patch(isAuthenticated, EventController.update)
  .delete(isAuthenticated, EventController.destroy);

router.patch("/eventos/type/:id", isAuthenticated, EventController.updateType);

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
