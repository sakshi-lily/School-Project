const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    permissions: {
      type: [String],
      default: ['all'],
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    department: {
      type: String,
      default: 'Administration',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Admin', AdminSchema);
