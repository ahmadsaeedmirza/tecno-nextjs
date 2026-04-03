const mongoose = require('mongoose');
const slugify = require('slugify');
const Catagory = require('./catagoryModel');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "A product must have a name"],
        unique: true,
        trim: true
    },
    code: {
        type: String
    },
    tip: [String],
    size: [String],
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
    },
    catagory: {
        type: mongoose.Schema.ObjectId,
        ref: 'Catagory'
    }
},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

productSchema.index({ slug: 1 });

productSchema.pre('save', function () {
    this.slug = slugify(this.name, { lower: true });
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;