const express = require("express");
const catagoryController = require("./../controllers/catagoryController");
const authController = require("./../controllers/authController");

const router = express.Router();

// GET routes are public
router
  .route("/")
  .get(catagoryController.getAllCatagories)
  .post(
    authController.protect,
    catagoryController.uploadCatagoryImage,
    catagoryController.resizeCatagoryImage,
    catagoryController.createCatagory,
  );

router
  .route("/:id")
  .get(catagoryController.getCatagory)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    catagoryController.uploadCatagoryImage,
    catagoryController.resizeCatagoryImage,
    catagoryController.updateCatagory,
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    catagoryController.deleteCatagory,
  );

module.exports = router;
