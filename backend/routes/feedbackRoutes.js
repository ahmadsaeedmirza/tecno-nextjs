const express = require("express");
const feedbackController = require("./../controllers/feedbackController");
const authController = require("./../controllers/authController");

const router = express.Router();

// Public: Submit and list feedback
router.route("/").get(feedbackController.getAllFeedbacks);
router.post("/", feedbackController.createFeedback);

// Protect all routes below (Login Only)
router.use(authController.protect);

router
  .route("/:id")
  .get(feedbackController.getFeedback)
  .patch(feedbackController.updateFeedback)
  .delete(feedbackController.deleteFeedback);

module.exports = router;
