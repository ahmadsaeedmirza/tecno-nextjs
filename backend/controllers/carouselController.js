const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const Carousel = require("./../models/carouselModel");
const factory = require("./factoryFunctions");
const catchAsync = require("./../utlis/catchAsync");
const AppError = require("./../utlis/appError");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload an image.", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadCarouselImage = upload.single("imageCover");

exports.resizeCarouselImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const extFromMime = (mime) => {
    if (mime === "image/jpeg") return "jpeg";
    if (mime === "image/png") return "png";
    if (mime === "image/webp") return "webp";
    if (mime === "image/gif") return "gif";
    return "jpg";
  };

  const fileExt = extFromMime(req.file.mimetype);
  req.body.imageCover = `carousel-${req.params.id || "new"}-${Date.now()}-cover.${fileExt}`;

  const uploadDir = path.join(__dirname, "../../public/carousels");
  
  // Ensure the carousels image directory exists
  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (err) {}

  const uploadPath = path.join(uploadDir, req.body.imageCover);
  await fs.writeFile(uploadPath, req.file.buffer);

  next();
});

exports.getAllCarousels = factory.getAll(Carousel);
exports.getCarousel = factory.getOne(Carousel);
exports.createCarousel = factory.createOne(Carousel);
exports.updateCarousel = factory.updateOne(Carousel);
exports.deleteCarousel = factory.deleteOne(Carousel);
