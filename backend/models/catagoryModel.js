const mongoose = require('mongoose');
const slugify = require('slugify');

const catagorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A product must have a name"],
        unique: true,
        trim: true
    },
    slug: String,
    description: {
        type: String,
        trim: true,
        required: [true, 'A product must have a description']
    },
    imageCover: {
        type: String,
        required: [true, 'A product must have an image']
    },
    isHidden: {
        type: String,
        default: 'false',
        enum: ['true', 'false']
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

catagorySchema.index({ slug: 1 });

catagorySchema.pre('save', function () {
    this.slug = slugify(this.name, { lower: true });
});

const Catagory = mongoose.model('Catagory', catagorySchema);

module.exports = Catagory;