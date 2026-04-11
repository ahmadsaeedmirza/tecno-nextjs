const mongoose = require("mongoose");
const slugify = require("slugify");
const AppError = require("../utlis/appError");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A product must have a name"],
      unique: true,
      trim: true,
    },
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

categorySchema.index({ slug: 1 });
categorySchema.index({ isFeatured: 1, isHidden: 1 });

categorySchema.pre("save", async function () {
  this.slug = slugify(this.name, { lower: true });

  if (this.isFeatured === "true") {
    const featuredCount = await this.constructor.countDocuments({
      isFeatured: "true",
    });
    if (featuredCount >= 4) {
      throw new AppError("You can only have a maximum of 4 featured categories.", 400);
    }
  }
});

categorySchema.pre("findOneAndUpdate", async function () {
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
          "You can only have a maximum of 4 featured categories.",
          400,
        );
      }
    }
  }
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
