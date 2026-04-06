const multer = require("multer");
const sharp = require("sharp");
const path = require("path");
const Catagory = require("./../models/catagoryModel");
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

// Middleware to handle single image upload for 'imageCover'
exports.uploadCatagoryImage = upload.single("imageCover");

// Middleware to resize the uploaded image and save it
exports.resizeCatagoryImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  // Set the filename and add it to req.body so the factoryFunction can save it to the DB
  req.body.imageCover = `catagory-${req.params.id || "new"}-${Date.now()}-cover.jpeg`;

  const uploadPath = path.join(
    __dirname,
    "../../public/categories",
    req.body.imageCover,
  );

  // Process the image: resize, format to jpeg, compress, and save to disk
  await sharp(req.file.buffer)
    .resize(2000, 1333) // Adjust dimensions if necessary
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(uploadPath);

  next();
});

// Basic CRUD Operations using Factory Functions
exports.getAllCatagories = factory.getAll(Catagory);
exports.getCatagory = factory.getOne(Catagory);
exports.createCatagory = factory.createOne(Catagory);
exports.updateCatagory = factory.updateOne(Catagory);
exports.deleteCatagory = factory.deleteOne(Catagory);
