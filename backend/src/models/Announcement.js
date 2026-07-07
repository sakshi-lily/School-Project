const mongoose = require('mongoose');

const AnnouncementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide announcement title'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Please provide announcement content'],
      trim: true,
    },
    type: {
      type: String,
      enum: ['Notice', 'Announcement'],
      default: 'Announcement',
    },
    targetAudience: {
      type: String,
      enum: ['all', 'teachers', 'students'],
      default: 'all',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Announcement', AnnouncementSchema);
