const mongoose = require('mongoose');

const InquirySchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      trim: true,
      default: '',
    },
    parentName: {
      type: String,
      required: [true, 'Please provide name'],
      trim: true,
    },
    parentEmail: {
      type: String,
      required: [true, 'Please provide email'],
      trim: true,
      lowercase: true,
    },
    parentPhone: {
      type: String,
      trim: true,
      default: '',
    },
    classGrade: {
      type: String,
      default: 'General Inquiry',
      trim: true,
    },
    academicYear: {
      type: String,
      default: 'N/A',
      trim: true,
    },
    stream: {
      type: String,
      trim: true,
      default: '',
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Reviewed', 'Contacted'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Inquiry', InquirySchema);
