const multer = require("multer");
const fs = require("fs/promises");
const AppError = require("../utlis/appError");
const User = require("./../models/userModels");
const catchAsync = require("./../utlis/catchAsync");
const factory = require("./factoryFunctions");

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

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = catchAsync(async (req, res) => {
  if (!req.file) return;

  const extFromMime = (mime) => {
    if (mime === "image/jpeg") return "jpeg";
    if (mime === "image/png") return "png";
    if (mime === "image/webp") return "webp";
    if (mime === "image/gif") return "gif";
    return "jpg";
  };

  const fileExt = extFromMime(req.file.mimetype);
  req.file.filename = `user-${req.user.id}-${Date.now()}.${fileExt}`;

  await fs.writeFile(`public/img/users/${req.file.filename}`, req.file.buffer);
});

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res) => {
  // 1) Create error if user POSTs password
  if (req.body.password || req.body.confirmPassword) {
    return new AppError(
      "This route is not for Password update! Please use /UpdatePassword",
      400,
    );
  }

  // 2) Update user document
  const filteredBody = filterObj(req.body, "name", "email");
  if (req.file) filteredBody.photo = req.file.filename;

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getMe = (req, res) => {
  req.params.id = req.user.id;
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.deleteUser = factory.deleteOne(User);
exports.updateUser = factory.updateOne(User);
