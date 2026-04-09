const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const sharp = require("sharp");
const Product = require("./../models/productModel");
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
exports.uploadProductImage = upload.single("imageCover");

// Middleware to resize the uploaded image and save it
exports.resizeProductImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const previousImageCover = req.params.id
    ? (await Product.findById(req.params.id).select("imageCover"))?.imageCover
    : undefined;

  // Log exactly what was uploaded (helps confirm if source is already cropped)
  try {
    const meta = await sharp(req.file.buffer).metadata();
    console.log("Product image upload:", {
      productId: req.params.id || "new",
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      bytes: req.file.size,
      width: meta.width,
      height: meta.height,
      format: meta.format,
      previousImageCover,
    });
  } catch (e) {
    console.log("Product image upload (metadata failed):", {
      productId: req.params.id || "new",
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      bytes: req.file.size,
      previousImageCover,
      error: e?.message,
    });
  }

  // Debug: log what we receive
  console.log("Product Form Data:", {
    name: req.body.name,
    description: req.body.description,
    code: req.body.code,
    category: req.body.category,
    file: req.file ? req.file.originalname : "no file",
  });

  const extFromMime = (mime) => {
    if (mime === "image/jpeg") return "jpeg";
    if (mime === "image/png") return "png";
    if (mime === "image/webp") return "webp";
    if (mime === "image/gif") return "gif";
    return "jpg";
  };

  // Save original bytes as-is (no crop/resize/re-encode)
  const fileExt = extFromMime(req.file.mimetype);
  req.body.imageCover = `product-${req.params.id || "new"}-${Date.now()}-cover.${fileExt}`;

  const uploadPath = path.join(
    __dirname,
    "../../public/products",
    req.body.imageCover,
  );

  await fs.writeFile(uploadPath, req.file.buffer);

  // On update, remove the previous image file to prevent stale images being served.
  if (
    req.params.id &&
    previousImageCover &&
    previousImageCover !== req.body.imageCover
  ) {
    const previousPath = path.join(
      __dirname,
      "../../public/products",
      previousImageCover,
    );
    try {
      await fs.unlink(previousPath);
    } catch {
      // Ignore if file doesn't exist or can't be removed
    }
  }

  next();
});

exports.parseArrayFields = (req, res, next) => {
  if (req.body.tip === "[]") req.body.tip = [];
  if (req.body.size === "[]") req.body.size = [];
  next();
};

exports.getProductBySlug = catchAsync(async (req, res, next) => {
  const slug = req.params.slug;
  const doc = await Product.findOne({ slug });

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

// Basic CRUD Operations using Factory Functions
exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product);
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
