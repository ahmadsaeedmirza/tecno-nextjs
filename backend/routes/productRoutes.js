const express = require("express");
const productController = require("./../controllers/productController");
const authController = require("./../controllers/authController");

const router = express.Router();

// GET routes are public
router
  .route("/")
  .get(productController.getAllProducts)
  .post(
    authController.protect,
    productController.uploadProductImage,
    productController.resizeProductImage,
    productController.createProduct,
  );

router
  .route("/:id")
  .get(productController.getProduct)
  .patch(
    authController.protect,
    productController.uploadProductImage,
    productController.resizeProductImage,
    productController.updateProduct,
  )
  .delete(authController.protect, productController.deleteProduct);

module.exports = router;
