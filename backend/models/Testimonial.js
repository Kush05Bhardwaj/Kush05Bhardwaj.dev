const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  position: String,
  company: String,
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  avatar: String,
  projectRelated: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project'
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better performance
TestimonialSchema.index({ order: 1, createdAt: -1 });

module.exports = mongoose.model('Testimonial', TestimonialSchema);
