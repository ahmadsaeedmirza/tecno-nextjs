const mongoose = require('mongoose');
const validator = require('validator');

const inquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        lowercase: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Please provide your phone number']
    },
    companyName: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        required: [true, 'Please provide your country']
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: 'Category',
        required: [true, 'Please select a category']
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
        required: [true, 'Please select a product']
    },
    message: {
        type: String,
        required: [true, 'Please provide a message'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Populate category and product when querying
inquirySchema.pre(/^find/, function() {
    this.populate({
        path: 'category',
        select: 'name'
    }).populate({
        path: 'product',
        select: 'name'
    });
});

const Inquiry = mongoose.model('Inquiry', inquirySchema);

module.exports = Inquiry;
