const multer = require('multer');
const sharp = require('sharp');
const Product = require('./../models/productModel');
const factory = require('./factoryFunctions');
const catchAsync = require('./../utlis/catchAsync');
const AppError = require('./../utlis/appError');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image')) {
        cb(null, true);
    } else {
        cb(new AppError('Not an image! Please upload an image.', 400), false);
    }
}

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter
});

// Middleware to handle single image upload for 'imageCover'
exports.uploadProductImage = upload.single('imageCover');

// Middleware to resize the uploaded image and save it
exports.resizeProductImage = catchAsync(async (req, res, next) => {
    if (!req.file) return next();

    // Set the filename and add it to req.body so the factoryFunction can save it to the DB
    req.body.imageCover = `product-${req.params.id || 'new'}-${Date.now()}-cover.jpeg`;

    // Process the image: resize, format to jpeg, compress, and save to disk
    await sharp(req.file.buffer)
        .resize(2000, 1333) // Adjust dimensions if necessary to match your frontend needs
        .toFormat('jpeg')
        .jpeg({ quality: 90 })
        .toFile(`public/img/products/${req.body.imageCover}`);

    next();
});

// Basic CRUD Operations using Factory Functions
exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product);
exports.createProduct = factory.createOne(Product);
exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);