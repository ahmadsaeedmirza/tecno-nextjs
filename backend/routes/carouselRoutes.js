const express = require("express");
const carouselController = require("./../controllers/carouselController");
const authController = require("./../controllers/authController");

const router = express.Router();

router.get("/", carouselController.getAllCarousels);
router.get("/:id", carouselController.getCarousel);

router.use(authController.protect);

router.post(
  "/",
  carouselController.uploadCarouselImage,
  carouselController.resizeCarouselImage,
  carouselController.createCarousel
);

router.patch(
  "/:id",
  carouselController.uploadCarouselImage,
  carouselController.resizeCarouselImage,
  carouselController.updateCarousel
);

router.delete("/:id", carouselController.deleteCarousel);

module.exports = router;
