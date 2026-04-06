const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const Catagory = require("./../models/catagoryModel");
const Product = require("./../models/productModel");
const factory = require("./factoryFunctions");
const catchAsync = require("./../utlis/catchAsync");
const AppError = require("./../utlis/appError");
const APIFeatures = require("./../utlis/apiFeatures");

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

  const extFromMime = (mime) => {
    if (mime === "image/jpeg") return "jpeg";
    if (mime === "image/png") return "png";
    if (mime === "image/webp") return "webp";
    if (mime === "image/gif") return "gif";
    return "jpg";
  };

  const fileExt = extFromMime(req.file.mimetype);
  req.body.imageCover = `catagory-${req.params.id || "new"}-${Date.now()}-cover.${fileExt}`;

  const uploadPath = path.join(
    __dirname,
    "../../public/categories",
    req.body.imageCover,
  );

  await fs.writeFile(uploadPath, req.file.buffer);

  next();
});

// Basic CRUD Operations using Factory Functions
exports.getAllCatagories = factory.getAll(Catagory);
exports.getCatagory = factory.getOne(Catagory);

exports.getCatagoryBySlug = catchAsync(async (req, res, next) => {
  const doc = await Catagory.findOne({ slug: req.params.slug });

  if (!doc) {
    return next(new AppError("No document found with this slug", 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});

exports.getProductsForCatagorySlug = catchAsync(async (req, res, next) => {
  const catagory = await Catagory.findOne({ slug: req.params.slug });

  if (!catagory) {
    return next(new AppError("No category found with this slug", 404));
  }

  // Prevent overriding our base filter with a query string
  const queryStr = { ...req.query };
  delete queryStr.catagory;

  const features = new APIFeatures(
    Product.find({ catagory: catagory._id }),
    queryStr,
  )
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const doc = await features.query;

  res.status(200).json({
    status: "success",
    resuts: doc.length,
    data: {
      data: doc,
    },
  });
});

exports.createCatagory = factory.createOne(Catagory);
exports.updateCatagory = factory.updateOne(Catagory);
exports.deleteCatagory = factory.deleteOne(Catagory);
