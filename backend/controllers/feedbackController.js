const Feedback = require('./../models/feedbackModel');
const factory = require('./factoryFunctions');

// Public: Submit feedback
exports.createFeedback = factory.createOne(Feedback);

// Admin: Get all feedback
exports.getAllFeedbacks = factory.getAll(Feedback);

// Admin: Get single feedback
exports.getFeedback = factory.getOne(Feedback);

// Admin: Update feedback
exports.updateFeedback = factory.updateOne(Feedback);

// Admin: Delete feedback
exports.deleteFeedback = factory.deleteOne(Feedback);
