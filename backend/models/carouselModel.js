const mongoose = require("mongoose");

const carouselSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "A carousel slide must have a title"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "A carousel slide must have a description"],
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, "A carousel slide must have an image"],
  },
  isHidden: {
    type: String,
    default: "false",
    enum: ["true", "false"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Carousel = mongoose.model("Carousel", carouselSchema);
module.exports = Carousel;
