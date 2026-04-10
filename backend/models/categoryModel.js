const mongoose = require("mongoose");
const slugify = require("slugify");

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

categorySchema.pre("save", function () {
  this.slug = slugify(this.name, { lower: true });
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
