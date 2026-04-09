const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const Category = require("./../models/categoryModel");
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
exports.uploadCategoryImage = upload.single("imageCover");

// Middleware to resize the uploaded image and save it
exports.resizeCategoryImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const extFromMime = (mime) => {
    if (mime === "image/jpeg") return "jpeg";
    if (mime === "image/png") return "png";
    if (mime === "image/webp") return "webp";
    if (mime === "image/gif") return "gif";
    return "jpg";
  };

  const fileExt = extFromMime(req.file.mimetype);
  req.body.imageCover = `category-${req.params.id || "new"}-${Date.now()}-cover.${fileExt}`;

  const uploadPath = path.join(
    __dirname,
    "../../public/categories",
    req.body.imageCover,
  );

  await fs.writeFile(uploadPath, req.file.buffer);

  next();
});

// Basic CRUD Operations using Factory Functions
exports.getAllCategories = factory.getAll(Category);
exports.getCategory = factory.getOne(Category);

exports.getCategoryBySlug = catchAsync(async (req, res, next) => {
  const doc = await Category.findOne({ slug: req.params.slug });

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

exports.getProductsForCategorySlug = catchAsync(async (req, res, next) => {
  const category = await Category.findOne({ slug: req.params.slug });

  if (!category) {
    return next(new AppError("No category found with this slug", 404));
  }

  // Prevent overriding our base filter with a query string
  const queryStr = { ...req.query };
  delete queryStr.category;

  const features = new APIFeatures(
    Product.find({ category: category._id }),
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

exports.createCategory = factory.createOne(Category);
exports.updateCategory = factory.updateOne(Category);
exports.deleteCategory = factory.deleteOne(Category);
