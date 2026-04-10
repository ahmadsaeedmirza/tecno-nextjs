const mongoose = require("mongoose");
const slugify = require("slugify");
const Category = require("./categoryModel");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A product must have a name"],
      unique: true,
      trim: true,
    },
    code: {
      type: String,
    },
    tip: [String],
    size: [String],
    slug: String,
    description: {
      type: String,
      trim: true,
      required: [true, "A product must have a description"],
    },
    imageCover: {
      type: String,
      required: [true, "A product must have an image"],
    },
    isHidden: {
      type: String,
      default: "false",
      enum: ["true", "false"],
    },
    isFeatured: {
      type: String,
      default: "false",
      enum: ["true", "false"],
    },
    category: {
      type: mongoose.Schema.ObjectId,
      ref: "Category",
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

productSchema.index({ slug: 1 });
productSchema.index({ isFeatured: 1, isHidden: 1 });

productSchema.pre(/^find/, function () {
  this.populate("category");
});

productSchema.pre("save", function () {
  this.slug = slugify(this.name, { lower: true });
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
