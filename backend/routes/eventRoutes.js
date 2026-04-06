const express = require("express");
const eventController = require("./../controllers/eventController");
const authController = require("./../controllers/authController");

const router = express.Router();

// GET routes are public
router
  .route("/")
  .get(eventController.getAllEvents)
  .post(
    authController.protect,
    eventController.uploadEventImage,
    eventController.resizeEventImage,
    eventController.createEvent,
  );

router
  .route("/:id")
  .get(eventController.getEvent)
  .patch(
    authController.protect,
    eventController.uploadEventImage,
    eventController.resizeEventImage,
    eventController.updateEvent,
  )
  .delete(authController.protect, eventController.deleteEvent);

module.exports = router;
