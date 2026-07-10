const mongoose = require('mongoose');

const CalendarEventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide event title'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Please provide event date'],
    },
    type: {
      type: String,
      enum: ['Holiday', 'Exam', 'Event', 'PTC', 'Other'],
      default: 'Event',
    },
    description: {
      type: String,
      trim: true,
    },
    academicYear: {
      type: String,
      required: [true, 'Please provide academic year'],
      default: '2026-2027',
      trim: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CalendarEvent', CalendarEventSchema);
