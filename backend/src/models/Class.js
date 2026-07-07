const mongoose = require('mongoose');

const ClassSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a class name (e.g. 10-A)'],
      trim: true,
    },
    section: {
      type: String,
      required: [true, 'Please provide a section'],
      trim: true,
    },
    subjects: {
      type: [String],
      default: [],
    },
    academicYear: {
      type: String,
      required: [true, 'Please provide an academic year (e.g. 2026-2027)'],
      trim: true,
    },
  },
  { timestamps: true }
);

// Create compound index for unique class + section per academic year
ClassSchema.index({ name: 1, section: 1, academicYear: 1 }, { unique: true });

module.exports = mongoose.model('Class', ClassSchema);
