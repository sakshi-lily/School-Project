const mongoose = require('mongoose');

const AdmitCardSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: true,
    trim: true
  },
  rollNumber: {
    type: String,
    required: true,
    trim: true,
    index: true
  },
  class: {
    type: String,
    required: true,
    trim: true
  },
  academicYear: {
    type: String,
    required: true,
    trim: true
  },
  dateOfBirth: {
    type: String,
    required: true,
    trim: true
  },
  fatherName: {
    type: String,
    trim: true,
    default: 'N/A'
  },
  motherName: {
    type: String,
    trim: true,
    default: 'N/A'
  },
  examCenter: {
    type: String,
    trim: true,
    default: 'Thakur Biri Singh Inter College, Tundla'
  },
  datesheet: [
    {
      subject: { type: String, required: true },
      date: { type: String, required: true },
      time: { type: String, required: true }
    }
  ],
  status: {
    type: String,
    enum: ['Published', 'Unpublished'],
    default: 'Published'
  }
}, { timestamps: true });

// Prevent duplicate roll number admit cards for same academic year
AdmitCardSchema.index({ rollNumber: 1, academicYear: 1 }, { unique: true });

module.exports = mongoose.model('AdmitCard', AdmitCardSchema);
