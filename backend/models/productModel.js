const mongoose = require("mongoose");
const slugify = require("slugify");
const Category = require("./categoryModel");
const AppError = require("../utlis/appError");

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

productSchema.pre("save", async function () {
  this.slug = slugify(this.name, { lower: true });

  if (this.isFeatured === "true") {
    const featuredCount = await this.constructor.countDocuments({
      isFeatured: "true",
    });
    if (featuredCount >= 4) {
      throw new AppError("You can only have a maximum of 4 featured products.", 400);
    }
  }
});

productSchema.pre("findOneAndUpdate", async function () {
  const update = this.getUpdate();
  if (update.isFeatured === "true") {
    const featuredCount = await this.model.countDocuments({
      isFeatured: "true",
    });
    if (featuredCount >= 4) {
      // Check if we are updating an already featured item (to allow it)
      const currentDoc = await this.model.findOne(this.getQuery());
      if (currentDoc && currentDoc.isFeatured !== "true") {
        throw new AppError(
          "You can only have a maximum of 4 featured products.",
          400,
        );
      }
    }
  }
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
