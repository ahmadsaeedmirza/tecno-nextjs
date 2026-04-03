const express = require('express');
const inquiryController = require('./../controllers/inquiryController');
const authController = require('./../controllers/authController');

const router = express.Router();

router.route('/')
    .get(authController.protect, authController.restrictTo('admin'), inquiryController.getAllInquiries)
    .post(inquiryController.createInquiry);

router.route('/:id')
    .get(authController.protect, authController.restrictTo('admin'), inquiryController.getInquiry)
    .delete(authController.protect, authController.restrictTo('admin'), inquiryController.deleteInquiry);

module.exports = router;
