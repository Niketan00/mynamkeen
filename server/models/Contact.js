const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    default: 'General Inquiry'
  },
  isRead: {
    type: Boolean,
    default: false
  },
  response: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Contact', contactSchema);



