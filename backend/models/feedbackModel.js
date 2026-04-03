const mongoose = require('mongoose');
const validator = require('validator');

const feedbackSchema = new mongoose.Schema({
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
    companyName: String,
    country: String,
    quality: { type: Number, min: 1, max: 5, required: true },
    packaging: { type: Number, min: 1, max: 5, required: true },
    reliability: { type: Number, min: 1, max: 5, required: true },
    onTime: { type: Number, min: 1, max: 5, required: true },
    shortage: { type: Number, min: 1, max: 5, required: true },
    damaged: { type: Number, min: 1, max: 5, required: true },
    averageRating: {
        type: Number,
        min: 1,
        max: 5
    },
    message: {
        type: String,
        required: [true, 'Please provide your feedback message'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Calculate averageRating before saving
feedbackSchema.pre('save', function() {
    const ratings = [
        this.quality,
        this.packaging,
        this.reliability,
        this.onTime,
        this.shortage,
        this.damaged
    ];
    
    const sum = ratings.reduce((acc, rating) => acc + rating, 0);
    this.averageRating = Math.round((sum / ratings.length) * 10) / 10;
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
