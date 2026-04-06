const express = require("express");
const feedbackController = require("./../controllers/feedbackController");
const authController = require("./../controllers/authController");

const router = express.Router();

// Public: Submit feedback
router.post("/", feedbackController.createFeedback);

// Protect all routes below (Login Only)
router.use(authController.protect);

router.route("/").get(feedbackController.getAllFeedbacks);

router
  .route("/:id")
  .get(feedbackController.getFeedback)
  .delete(feedbackController.deleteFeedback);

module.exports = router;
