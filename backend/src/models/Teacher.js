const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subjects: {
      type: [String],
      required: [true, 'Please provide at least one subject taught'],
    },
    qualification: {
      type: String,
      required: [true, 'Please provide teaching qualifications'],
    },
    classesAssigned: {
      type: [String],
      default: [],
    },
    experienceYears: {
      type: Number,
      default: 0,
    },
    joinedDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Teacher', TeacherSchema);
