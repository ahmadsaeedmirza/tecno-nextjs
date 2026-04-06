const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const Event = require("./../models/eventModel");
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
exports.uploadEventImage = upload.single("imageCover");

// Middleware to resize the uploaded image and save it
exports.resizeEventImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  const extFromMime = (mime) => {
    if (mime === "image/jpeg") return "jpeg";
    if (mime === "image/png") return "png";
    if (mime === "image/webp") return "webp";
    if (mime === "image/gif") return "gif";
    return "jpg";
  };

  const fileExt = extFromMime(req.file.mimetype);
  req.body.imageCover = `event-${req.params.id || "new"}-${Date.now()}-cover.${fileExt}`;

  const uploadPath = path.join(
    __dirname,
    "../../public/events",
    req.body.imageCover,
  );

  await fs.writeFile(uploadPath, req.file.buffer);

  next();
});

// Basic CRUD Operations using Factory Functions
exports.getAllEvents = factory.getAll(Event);
exports.getEvent = factory.getOne(Event);
exports.createEvent = factory.createOne(Event);
exports.updateEvent = factory.updateOne(Event);
exports.deleteEvent = factory.deleteOne(Event);
