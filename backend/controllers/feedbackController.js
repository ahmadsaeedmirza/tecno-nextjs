const Feedback = require('./../models/feedbackModel');
const factory = require('./factoryFunctions');

const catchAsync = require('./../utlis/catchAsync');
const sendEmailJS = require('./../utlis/sendEmailJS');

// Public: Submit feedback
exports.createFeedback = catchAsync(async (req, res, next) => {
  const doc = await Feedback.create(req.body);

  // Send autonomous confirmation email (awaiting briefly to ensure logs are visible)
  await sendEmailJS({
    name: doc.name,
    email: doc.email,
    type: "Feedback",
    message_content: doc.message
  });

  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});

// Admin: Get all feedback
exports.getAllFeedbacks = factory.getAll(Feedback);

// Admin: Get single feedback
exports.getFeedback = factory.getOne(Feedback);

// Admin: Update feedback
exports.updateFeedback = factory.updateOne(Feedback);

// Admin: Delete feedback
exports.deleteFeedback = factory.deleteOne(Feedback);
