const express = require("express");
const categoryController = require("./../controllers/categoryController");
const authController = require("./../controllers/authController");

const router = express.Router();

// GET routes are public
router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(
    authController.protect,
    categoryController.uploadCategoryImage,
    categoryController.resizeCategoryImage,
    categoryController.createCategory,
  );

router.route("/slug/:slug").get(categoryController.getCategoryBySlug);

router
  .route("/:slug/products")
  .get(categoryController.getProductsForCategorySlug);

router
  .route("/:id")
  .get(categoryController.getCategory)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    categoryController.uploadCategoryImage,
    categoryController.resizeCategoryImage,
    categoryController.updateCategory,
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    categoryController.deleteCategory,
  );

module.exports = router;
