const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide student name'],
      trim: true,
    },
    rollNumber: {
      type: String,
      required: [true, 'Please provide roll number'],
      unique: true,
      trim: true,
    },
    class: {
      type: String, // String representation or class reference (e.g. "10-A")
      required: [true, 'Please provide student class'],
      trim: true,
    },
    academicYear: {
      type: String,
      required: [true, 'Please provide academic year'],
      trim: true,
    },
    parentEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ['Active', 'Suspended'],
      default: 'Active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Student', StudentSchema);
