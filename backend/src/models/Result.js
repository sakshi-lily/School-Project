const mongoose = require('mongoose');

const SubjectMarkSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  maxMarks: {
    type: Number,
    required: true,
    default: 100,
  },
  marksObtained: {
    type: Number,
    required: true,
    min: 0,
  },
});

const ResultSchema = new mongoose.Schema(
  {
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    rollNumber: {
      type: String,
      required: true,
      trim: true,
    },
    class: {
      type: String, // e.g. "10-A"
      required: true,
      trim: true,
    },
    academicYear: {
      type: String, // e.g. "2026-2027"
      required: true,
      trim: true,
    },
    term: {
      type: String,
      required: true,
      enum: ['Half-Yearly', 'Final'],
    },
    subjectMarks: [SubjectMarkSchema],
    totalMarks: {
      type: Number,
      required: true,
    },
    maxTotalMarks: {
      type: Number,
      required: true,
    },
    percentage: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    grade: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Published', 'Unpublished'],
      default: 'Unpublished',
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

// Compound index to prevent duplicate term result for same student rollNumber in same academic year
ResultSchema.index({ rollNumber: 1, academicYear: 1, term: 1 }, { unique: true });

module.exports = mongoose.model('Result', ResultSchema);
