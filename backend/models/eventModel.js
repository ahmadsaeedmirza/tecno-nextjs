const mongoose = require("mongoose");
const slugify = require("slugify");
const AppError = require("../utlis/appError");

const eventSchema = new mongoose.Schema(
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
    date: {
      type: Date,
      required: [true, "A product must have a date"],
    },
    StallNo: {
      type: String,
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

eventSchema.index({ slug: 1 });
eventSchema.index({ isFeatured: 1, isHidden: 1 });

eventSchema.pre("save", async function () {
  this.slug = slugify(this.name, { lower: true });

  if (this.isFeatured === "true") {
    const featuredCount = await this.constructor.countDocuments({
      isFeatured: "true",
    });
    if (featuredCount >= 1) {
      throw new AppError("You can only have exactly one featured event.", 400);
    }
  }
});

eventSchema.pre("findOneAndUpdate", async function () {
  const update = this.getUpdate();
  if (update.isFeatured === "true") {
    const featuredCount = await this.model.countDocuments({
      isFeatured: "true",
    });
    if (featuredCount >= 1) {
      // Check if we are updating the already featured item (to allow it)
      const currentDoc = await this.model.findOne(this.getQuery());
      if (currentDoc && currentDoc.isFeatured !== "true") {
        throw new AppError("You can only have exactly one featured event.", 400);
      }
    }
  }
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
