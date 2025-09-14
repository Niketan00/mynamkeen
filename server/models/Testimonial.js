const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  customerEmail: String,
  customerPhone: String
}, {
  timestamps: true
});

module.exports = mongoose.model('Testimonial', testimonialSchema);



