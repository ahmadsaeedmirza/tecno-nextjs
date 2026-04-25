const express = require("express");
const inquiryController = require("./../controllers/inquiryController");
const authController = require("./../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, inquiryController.getAllInquiries)
  .post(inquiryController.createInquiry);

router
  .route("/:id")
  .get(authController.protect, inquiryController.getInquiry)
  .patch(authController.protect, inquiryController.updateInquiry)
  .delete(authController.protect, inquiryController.deleteInquiry);

module.exports = router;
