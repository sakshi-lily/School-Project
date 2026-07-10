const mongoose = require('mongoose');

const SyllabusSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  class: {
    type: String,
    required: true,
    trim: true
  },
  subject: {
    type: String,
    required: true,
    trim: true
  },
  academicYear: {
    type: String,
    required: true,
    trim: true
  },
  pdfUrl: {
    type: String,
    required: true,
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Syllabus', SyllabusSchema);
