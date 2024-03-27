const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/authenticator");
const EventController = require("../controller/Event");
const AdminController = require("../controller/Admin");

router
  .route("/event")
  .get(isAuthenticated, EventController.getAll)
  .post(isAuthenticated, EventController.create);

router
  .route("/event/:id")
  .get(EventController.getByID)
  .patch(isAuthenticated, EventController.update)
  .delete(isAuthenticated, EventController.destroy);

router.patch("/event/type/:id", isAuthenticated, EventController.updateType);
router.post("/event/create_many", isAuthenticated, EventController.createMany);

router.post("/event/dynamic", isAuthenticated, EventController.createDynamic);
router.post(
  "/event/dynamic/create_many",
  isAuthenticated,
  EventController.createManyDynamic
);

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
