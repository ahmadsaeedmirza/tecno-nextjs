const Inquiry = require('./../models/inquiryModel');
const factory = require('./factoryFunctions');
const catchAsync = require('./../utlis/catchAsync');
const sendEmailJS = require('./../utlis/sendEmailJS');
const socketUtils = require('./../utlis/socket');

exports.createInquiry = catchAsync(async (req, res, next) => {
  let doc = await Inquiry.create(req.body);

  // Populate product so we can send the actual name in the email
  try {
    doc = await doc.populate({ path: 'product', select: 'name' });
  } catch (popErr) {
    console.warn('Populate failed:', popErr.message);
  }

  // Real-time notification
  try {
    const io = socketUtils.getIO();
    io.emit('new-inquiry', doc);
  } catch (err) {
    console.error('Socket emit failed:', err.message);
  }

  // Send autonomous confirmation email (awaiting briefly to ensure logs are visible)
  await sendEmailJS({
    name: doc.name,
    email: doc.email,
    type: "Inquiry",
    product_name: doc.product?.name || "General Inquiry",
    message_content: doc.message
  });

  res.status(201).json({
    status: 'success',
    data: {
      data: doc
    }
  });
});
exports.getAllInquiries = factory.getAll(Inquiry);
exports.getInquiry = factory.getOne(Inquiry);
exports.deleteInquiry = factory.deleteOne(Inquiry);
