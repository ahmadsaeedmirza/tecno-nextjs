const mongoose = require("mongoose");
const slugify = require("slugify");

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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

eventSchema.index({ slug: 1 });

eventSchema.pre("save", function () {
  this.slug = slugify(this.name, { lower: true });
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
