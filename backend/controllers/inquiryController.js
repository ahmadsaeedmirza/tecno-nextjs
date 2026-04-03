const Inquiry = require('./../models/inquiryModel');
const factory = require('./factoryFunctions');

exports.createInquiry = factory.createOne(Inquiry);
exports.getAllInquiries = factory.getAll(Inquiry);
exports.getInquiry = factory.getOne(Inquiry);
exports.deleteInquiry = factory.deleteOne(Inquiry);
